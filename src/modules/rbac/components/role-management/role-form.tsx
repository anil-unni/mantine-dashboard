import React from 'react';
import {
    Modal,
    Stack,
    TextInput,
    Textarea,
    Switch,
    MultiSelect,
    Button,
    Group,
    Alert,
    Text,
    Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRBAC } from '../../hooks/use-rbac';
import { Role, Permission } from '../../../../types/api';
import { RoleFormData } from '../../types';

interface RoleFormProps {
    opened: boolean;
    onClose: () => void;
    role?: Role | null;
    onSuccess?: () => void;
}

export function RoleForm({ opened, onClose, role, onSuccess }: RoleFormProps) {
    const { permissions, createRole, updateRole, loading } = useRBAC();
    const isEditing = !!role;

    const form = useForm<RoleFormData>({
        initialValues: {
            name: role?.name || '',
            description: role?.description || '',
            permissions: role?.permissions?.map(p => p.id) || [],
            is_active: role?.is_active ?? true,
        },
        validate: {
            name: (value) => (!value ? 'Role name is required' : null),
        },
    });

    const handleSubmit = async (values: RoleFormData) => {
        try {
            if (isEditing) {
                await updateRole(role!.id, values);
            } else {
                await createRole(values);
            }
            form.reset();
            onClose();
            onSuccess?.();
        } catch (error) {
            console.error('Failed to save role:', error);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const permissionOptions = permissions.map(permission => ({
        value: permission.id.toString(),
        label: `${permission.name} (${permission.resource})`,
        group: permission.resource,
    }));

    const groupedPermissions = permissionOptions.reduce((acc, option) => {
        const group = option.group;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(option);
        return acc;
    }, {} as Record<string, typeof permissionOptions>);

    const permissionGroups = Object.entries(groupedPermissions).map(([group, options]) => ({
        group,
        items: options,
    }));

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={isEditing ? 'Edit Role' : 'Create Role'}
            size="lg"
            centered
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <TextInput
                        label="Role Name"
                        placeholder="Enter role name"
                        required
                        {...form.getInputProps('name')}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Enter role description"
                        minRows={3}
                        {...form.getInputProps('description')}
                    />

                    <Switch
                        label="Active"
                        description="Whether this role is active and can be assigned to users"
                        {...form.getInputProps('is_active', { type: 'checkbox' })}
                    />

                    <Divider />

                    <div>
                        <Text fw={500} size="sm" mb="xs">
                            Permissions
                        </Text>
                        <Text size="xs" c="dimmed" mb="md">
                            Select the permissions that users with this role will have
                        </Text>

                        <MultiSelect
                            placeholder="Select permissions"
                            data={permissionGroups}
                            value={form.values.permissions.map(String)}
                            onChange={(values) =>
                                form.setFieldValue('permissions', values.map(Number))
                            }
                            searchable
                            clearable
                            maxDropdownHeight={300}
                        />
                    </div>

                    {form.values.permissions.length > 0 && (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Selected Permissions"
                            color="blue"
                            variant="light"
                        >
                            <Text size="sm">
                                {form.values.permissions.length} permission(s) selected
                            </Text>
                        </Alert>
                    )}

                    <Group justify="flex-end" gap="sm">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading.isCreatingRole || loading.isUpdatingRole}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading.isCreatingRole || loading.isUpdatingRole}
                        >
                            {isEditing ? 'Update Role' : 'Create Role'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
