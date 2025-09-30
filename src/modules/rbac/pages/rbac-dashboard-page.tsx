import React from 'react';
import { Container, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { RBACDashboard } from '../components/rbac-dashboard/rbac-dashboard';

export function RBACDashboardPage() {
    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'RBAC', href: '/rbac' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <RBACDashboard />
        </Container>
    );
}
