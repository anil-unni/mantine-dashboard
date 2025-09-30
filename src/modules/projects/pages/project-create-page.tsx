import React from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ProjectFormData } from '../types';
import { useProjects } from '../hooks/use-projects';
import { ProjectForm } from '../components';

export function ProjectCreatePage() {
    const navigate = useNavigate();
    const { createProject } = useProjects();

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Projects', href: '/app/projects' },
        { title: 'Create Project', href: '/app/projects/create' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const handleCreateProject = async (data: ProjectFormData) => {
        try {
            await createProject(data);
            navigate('/app/projects');
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>

            <Stack gap="lg">
                <div>
                    <Title order={2}>Create New Project</Title>
                    <Text c="dimmed" size="sm">
                        Fill out the form below to create a new project
                    </Text>
                </div>

                <ProjectForm
                    onSubmit={async (data: ProjectFormData) => {
                        await handleCreateProject(data);
                    }}
                />
            </Stack>
        </Container>
    );
}
