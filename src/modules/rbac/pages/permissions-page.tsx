import React, { useState } from 'react';
import { Container, Title } from '@mantine/core';
import { PermissionList } from '../components/role-management/permission-list';
import { PermissionForm } from '../components/role-management/permission-form';
import { Permission } from '@/types/api';

export function PermissionsPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Permission | null>(null);

    const openCreate = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const openEdit = (permission: Permission) => {
        setEditing(permission);
        setFormOpen(true);
    };

    return (
        <Container size="xl" py="md">
            <Title order={2} mb="md">Permissions</Title>
            <PermissionList onEdit={openEdit} onCreate={openCreate} />
            <PermissionForm opened={formOpen} onClose={() => setFormOpen(false)} permission={editing} onSuccess={() => setFormOpen(false)} />
        </Container>
    );
}

export default PermissionsPage;
