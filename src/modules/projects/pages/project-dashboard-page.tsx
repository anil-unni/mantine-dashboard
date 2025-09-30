import React from 'react';
import { Container, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { ProjectDashboard } from '../components/project-dashboard/project-dashboard';

export function ProjectDashboardPage() {
    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: 'Projects', href: '/projects' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <ProjectDashboard />
        </Container>
    );
}
