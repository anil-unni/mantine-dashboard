import React from 'react';
import { Modal, Stack, TextInput, Textarea, Switch, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRBAC } from '../../hooks/use-rbac';
import { Permission } from '../../../../types/api';
import { PermissionFormData } from '../../types';

interface PermissionFormProps {
    opened: boolean;
    onClose: () => void;
    permission?: Permission | null;
    onSuccess?: () => void;
}

export function PermissionForm({ opened, onClose, permission, onSuccess }: PermissionFormProps) {
    const { createPermission, updatePermission, isCreatingPermission, isUpdatingPermission } = useRBAC();
    const isEditing = !!permission;

    const form = useForm<PermissionFormData>({
        initialValues: {
            name: permission?.name || '',
            codename: (permission as any)?.codename || '',
            description: permission?.description || '',
            is_active: (permission as any)?.is_active ?? true,
        },
        validate: {
            name: (value) => (!value ? 'Permission name is required' : null),
            codename: (value) => (!value ? 'Codename is required' : null),
        },
    });

    const handleSubmit = async (values: PermissionFormData) => {
        try {
            if (isEditing) {
                await updatePermission({ id: permission!.id, data: values });
            } else {
                await createPermission(values);
            }
            form.reset();
            onClose();
            onSuccess?.();
        } catch (error) {
            console.error('Failed to save permission:', error);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal opened={opened} onClose={handleClose} title={isEditing ? 'Edit Permission' : 'Create Permission'} size="lg" centered>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <TextInput label="Permission Name" placeholder="Enter permission name" required {...form.getInputProps('name')} />
                    <TextInput label="Codename" placeholder="unique.codename" required {...form.getInputProps('codename')} />
                    <Textarea label="Description" placeholder="Enter permission description" minRows={3} {...form.getInputProps('description')} />
                    <Switch label="Active" {...form.getInputProps('is_active', { type: 'checkbox' })} />
                    <Group justify="flex-end" gap="sm">
                        <Button variant="outline" onClick={handleClose} disabled={isCreatingPermission || isUpdatingPermission}>Cancel</Button>
                        <Button type="submit" loading={isCreatingPermission || isUpdatingPermission}>{isEditing ? 'Update Permission' : 'Create Permission'}</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}


