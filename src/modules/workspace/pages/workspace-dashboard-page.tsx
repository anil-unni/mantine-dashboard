import React from 'react';
import { Container, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { WorkspaceDashboard } from '../components/workspace-dashboard/workspace-dashboard';

export function WorkspaceDashboardPage() {
    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Workspace', href: '/app/workspace' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <WorkspaceDashboard />
        </Container>
    );
}
