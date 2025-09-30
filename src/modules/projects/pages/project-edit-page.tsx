import React, { useEffect, useState } from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/use-projects';
import { ProjectForm } from '../components/project-form/project-form';
import { ProjectFormData } from '../types';

export function ProjectEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProject, updateProject, isUpdatingProject } = useProjects();
    const [initial, setInitial] = useState<ProjectFormData | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!id) return;
            const proj = await getProject(Number(id));
            if (mounted) {
                setInitial({
                    name: proj.name,
                    description: proj.description ?? '',
                    status: proj.status as any,
                    priority: proj.priority as any,
                    start_date: proj.start_date ?? undefined,
                    end_date: proj.end_date ?? undefined,
                    project_manager: undefined,
                    team_members: [],
                    budget: proj.budget ?? '',
                    tags: proj.tags ?? {},
                    settings: proj.settings ?? {},
                    is_active: proj.is_active,
                });
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Projects', href: '/app/projects' },
        { title: 'Edit', href: `/app/projects/${id}/edit` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    if (!initial) {
        return (
            <Container size="xl" py="md">
                <Text>Loading...</Text>
            </Container>
        );
    }

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <Stack gap="lg">
                <Title order={2}>Edit Project</Title>
                <Card withBorder>
                    <ProjectForm
                        initialValues={initial}
                        isSubmitting={isUpdatingProject}
                        onSubmit={async (values) => {
                            await updateProject({ id: Number(id), data: values });
                            navigate(`/app/projects/${id}`);
                        }}
                    />
                </Card>
            </Stack>
        </Container>
    );
}

export default ProjectEditPage;


