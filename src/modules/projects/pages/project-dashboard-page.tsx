import React from 'react';
import { Container, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ProjectDashboard } from '../components/project-dashboard/project-dashboard';

export function ProjectDashboardPage() {
    const navigate = useNavigate();
    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Projects', href: '/app/projects' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <ProjectDashboard onNavigate={(path) => navigate(path)} />
        </Container>
    );
}
