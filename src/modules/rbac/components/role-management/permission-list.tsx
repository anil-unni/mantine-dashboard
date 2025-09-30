import React, { useState } from 'react';
import { Card, Group, Text, Badge, ActionIcon, Menu, Button, Stack, Modal } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { DataTable, TableColumn } from '../../../shared/components';
import { useRBAC } from '../../hooks/use-rbac';
import { Permission } from '../../../../types/api';

interface PermissionListProps {
    onEdit?: (permission: Permission) => void;
    onCreate?: () => void;
}

export function PermissionList({ onEdit, onCreate }: PermissionListProps) {
    const { permissions, loading, deletePermission } = useRBAC();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);

    const handleDelete = (permission: Permission) => {
        setPermissionToDelete(permission);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (permissionToDelete) {
            try {
                await deletePermission(permissionToDelete.id);
                setDeleteModalOpen(false);
                setPermissionToDelete(null);
            } catch (error) {
                console.error('Failed to delete permission:', error);
            }
        }
    };

    const columns: TableColumn<Permission>[] = [
        { key: 'name', title: 'Name', width: '30%', render: (value) => <Text fw={500}>{value}</Text> },
        { key: 'codename', title: 'Codename', width: '30%' },
        { key: 'is_active', title: 'Status', width: '20%', render: (v: any) => <Badge variant="light" color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Badge> },
        {
            key: 'actions',
            title: 'Actions',
            width: '20%',
            render: (_, record) => (
                <Group gap="xs">
                    <ActionIcon variant="subtle" color="blue" onClick={() => onEdit?.(record)}><IconEdit size={16} /></ActionIcon>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle"><IconDots size={16} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => onEdit?.(record)}>Edit Permission</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={() => handleDelete(record)}>Delete Permission</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ),
        },
    ];

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <div>
                        <Text fw={500} size="lg">Permissions</Text>
                        <Text size="sm" c="dimmed">Manage available permissions</Text>
                    </div>
                    <Button leftSection={<IconPlus size={16} />} onClick={onCreate}>Create Permission</Button>
                </Group>

                <DataTable data={permissions} columns={columns} loading={loading.permissions} searchable filterable exportable />
            </Card>

            <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Permission" centered>
                <Stack gap="md">
                    <Text size="sm">This action cannot be undone.</Text>
                    <Group justify="flex-end" gap="sm">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        <Button color="red" onClick={confirmDelete} loading={loading.permissions}>Delete Permission</Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}


