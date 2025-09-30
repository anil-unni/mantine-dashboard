import React, { useMemo, useState } from 'react';
import { Container, Title, Breadcrumbs, Anchor, Card, Group, Text, Button, Modal, Stack, MultiSelect } from '@mantine/core';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { DataTable, TableColumn } from '../../shared/components';
import { useRBAC } from '../hooks/use-rbac';
import { Role, User } from '../../../types/api';

export function UsersPage() {
    const { users, roles, userRoles, assignUserRole, removeUserRole, loading } = useRBAC();
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'RBAC', href: '/app/rbac' },
        { title: 'Users', href: '/app/rbac/users' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const userIdToRoleIds = useMemo(() => {
        const map = new Map<number, number[]>();
        userRoles.forEach((ur) => {
            const list = map.get(ur.user.id) ?? [];
            list.push(ur.role.id);
            map.set(ur.user.id, list);
        });
        return map;
    }, [userRoles]);

    const roleOptions = roles.map(r => ({ value: r.id.toString(), label: r.name }));

    const openAssign = (user: User) => {
        setSelectedUser(user);
        setSelectedRoleIds(userIdToRoleIds.get(user.id) ?? []);
        setAssignOpen(true);
    };

    const saveAssignments = async () => {
        if (!selectedUser) return;
        const current = new Set(userIdToRoleIds.get(selectedUser.id) ?? []);
        const next = new Set(selectedRoleIds);

        // Roles to add
        for (const roleId of next) {
            if (!current.has(roleId)) {
                await assignUserRole({ user: selectedUser.id, role: roleId });
            }
        }

        // Roles to remove
        for (const roleId of current) {
            if (!next.has(roleId)) {
                // Find assignment id
                const assignment = userRoles.find(ur => ur.user.id === selectedUser.id && ur.role.id === roleId);
                if (assignment) await removeUserRole(assignment.id);
            }
        }

        setAssignOpen(false);
        setSelectedUser(null);
    };

    const columns: TableColumn<User>[] = [
        { key: 'username', title: 'Username', width: '25%' },
        { key: 'email', title: 'Email', width: '30%' },
        { key: 'is_active', title: 'Status', width: '15%', render: (v) => <Text c={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Text> },
        { key: 'date_joined', title: 'Joined', width: '15%' },
        { key: 'actions', title: 'Actions', width: '15%', render: (_, record) => <Button size="xs" onClick={() => openAssign(record)}>Manage Roles</Button> },
    ];

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <Title order={2} mb="md">Users</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <div>
                        <Text fw={500} size="lg">User List</Text>
                        <Text size="sm" c="dimmed">Manage user role assignments</Text>
                    </div>
                    <Button component={Link} to={paths.app.rbac.usersCreate} size="sm">Add User</Button>
                </Group>
                <DataTable data={users} columns={columns} loading={loading.users} searchable filterable exportable />
            </Card>

            <Modal opened={assignOpen} onClose={() => setAssignOpen(false)} title={`Manage Roles for ${selectedUser?.username ?? ''}`} centered>
                <Stack gap="md">
                    <MultiSelect data={roleOptions} value={selectedRoleIds.map(String)} onChange={(vals) => setSelectedRoleIds(vals.map(Number))} searchable clearable />
                    <Group justify="flex-end" gap="sm">
                        <Button variant="outline" onClick={() => setAssignOpen(false)}>Cancel</Button>
                        <Button onClick={saveAssignments} loading={loading.userRoles}>Save</Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    );
}


