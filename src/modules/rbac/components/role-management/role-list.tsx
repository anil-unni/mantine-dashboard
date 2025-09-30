import React, { useState } from 'react';
import {
    Card,
    Group,
    Text,
    Badge,
    ActionIcon,
    Menu,
    Button,
    Stack,
    Modal,
    TextInput,
    Textarea,
    Switch,
    MultiSelect,
    Alert,
} from '@mantine/core';
import {
    IconDots,
    IconEdit,
    IconTrash,
    IconUsers,
    IconKey,
    IconPlus,
    IconAlertCircle,
} from '@tabler/icons-react';
import { DataTable, TableColumn } from '../../../shared/components';
import { useRBAC } from '../../hooks/use-rbac';
import { Role, Permission } from '../../../../types/api';
import { RoleFormData } from '../../types';
import { formatDate } from '../../../shared/utils';

interface RoleListProps {
    onEdit?: (role: Role) => void;
    onDelete?: (role: Role) => void;
    onManagePermissions?: (role: Role) => void;
    onCreate?: () => void;
}

export function RoleList({
    onEdit,
    onDelete,
    onManagePermissions,
    onCreate,
}: RoleListProps) {
    const { roles, permissions, loading, deleteRole } = useRBAC();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    const handleDelete = (role: Role) => {
        setRoleToDelete(role);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (roleToDelete) {
            try {
                await deleteRole(roleToDelete.id);
                setDeleteModalOpen(false);
                setRoleToDelete(null);
            } catch (error) {
                console.error('Failed to delete role:', error);
            }
        }
    };

    const columns: TableColumn<Role>[] = [
        {
            key: 'name',
            title: 'Role Name',
            width: '25%',
            render: (value, record) => (
                <Stack gap="xs">
                    <Text fw={500}>{value}</Text>
                    {record.description && (
                        <Text size="sm" c="dimmed" lineClamp={2}>
                            {record.description}
                        </Text>
                    )}
                </Stack>
            ),
        },
        {
            key: 'permissions',
            title: 'Permissions',
            width: '30%',
            render: (_, record) => (
                <Group gap="xs">
                    <Badge variant="light" color="blue" size="sm">
                        {record.permissions?.length || 0} permissions
                    </Badge>
                </Group>
            ),
        },
        {
            key: 'is_active',
            title: 'Status',
            width: '15%',
            render: (value) => (
                <Badge color={value ? 'green' : 'red'} variant="light">
                    {value ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            key: 'created_at',
            title: 'Created',
            width: '20%',
            render: (value) => (
                <Text size="sm" c="dimmed">
                    {formatDate(value)}
                </Text>
            ),
        },
        {
            key: 'actions',
            title: 'Actions',
            width: '10%',
            render: (_, record) => (
                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => onEdit?.(record)}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="orange"
                        onClick={() => onManagePermissions?.(record)}
                    >
                        <IconKey size={16} />
                    </ActionIcon>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <IconDots size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconEdit size={14} />}
                                onClick={() => onEdit?.(record)}
                            >
                                Edit Role
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconKey size={14} />}
                                onClick={() => onManagePermissions?.(record)}
                            >
                                Manage Permissions
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                leftSection={<IconTrash size={14} />}
                                color="red"
                                onClick={() => handleDelete(record)}
                            >
                                Delete Role
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ),
        },
    ];

    if (loading.roles) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text>Loading roles...</Text>
            </Card>
        );
    }

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <div>
                        <Text fw={500} size="lg">
                            Roles
                        </Text>
                        <Text size="sm" c="dimmed">
                            Manage user roles and their permissions
                        </Text>
                    </div>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={onCreate}
                    >
                        Create Role
                    </Button>
                </Group>

                <DataTable
                    data={roles}
                    columns={columns}
                    loading={loading.roles}
                    searchable
                    filterable
                    exportable
                />
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Role"
                centered
            >
                <Stack gap="md">
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Are you sure?"
                        color="red"
                        variant="light"
                    >
                        This action cannot be undone. This will permanently delete the role
                        and remove all user assignments.
                    </Alert>

                    {roleToDelete && (
                        <Text size="sm">
                            You are about to delete the role: <strong>{roleToDelete.name}</strong>
                        </Text>
                    )}

                    <Group justify="flex-end" gap="sm">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="red"
                            onClick={confirmDelete}
                            loading={loading.roles}
                        >
                            Delete Role
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}
