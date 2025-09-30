import React, { useState } from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack } from '@mantine/core';
import { RoleList } from '../components/role-management/role-list';
import { RoleForm } from '../components/role-management/role-form';
import { Role } from '../../../types/api';

export function RolesPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'RBAC', href: '/app/rbac' },
        { title: 'Roles', href: '/app/rbac/roles' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const handleCreate = () => {
        setEditingRole(null);
        setFormOpen(true);
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setFormOpen(true);
    };

    const handleDelete = (role: Role) => {
        // Delete logic is handled in the RoleList component
        console.log('Delete role:', role);
    };

    const handleManagePermissions = (role: Role) => {
        // Navigate to permissions management for this role
        console.log('Manage permissions for role:', role);
    };

    const handleFormSuccess = () => {
        setFormOpen(false);
        setEditingRole(null);
    };

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>

            <Stack gap="md">
                <div>
                    <Title order={2}>Role Management</Title>
                    <p>Create and manage user roles and their permissions</p>
                </div>

                <RoleList
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onManagePermissions={handleManagePermissions}
                />
            </Stack>

            <RoleForm
                opened={formOpen}
                onClose={() => setFormOpen(false)}
                role={editingRole}
                onSuccess={handleFormSuccess}
            />
        </Container>
    );
}
