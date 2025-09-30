import React, { useEffect, useState } from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text, Group, Badge, Button } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/use-projects';
import { formatDate } from '../../shared/utils';

export function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProjectWithDetails } = useProjects();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!id) return;
            const data = await getProjectWithDetails(Number(id));
            if (mounted) {
                setProject(data);
                setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [id]);

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Projects', href: '/app/projects' },
        { title: project?.name ?? 'Project', href: `/app/projects/${id}` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    if (loading) {
        return (
            <Container size="xl" py="md">
                <Text>Loading...</Text>
            </Container>
        );
    }

    if (!project) {
        return (
            <Container size="xl" py="md">
                <Text>Project not found</Text>
            </Container>
        );
    }

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <Group justify="space-between" mb="md">
                <div>
                    <Title order={2}>{project.name}</Title>
                    <Text c="dimmed" size="sm">{project.description}</Text>
                </div>
                <Group>
                    <Badge variant="light" color={project.is_active ? 'green' : 'red'}>{project.is_active ? 'Active' : 'Inactive'}</Badge>
                    <Button onClick={() => navigate(`/app/projects/${id}/edit`)}>Edit</Button>
                </Group>
            </Group>

            <Stack gap="md">
                <Card withBorder>
                    <Group justify="space-between">
                        <Text>Manager: {project.project_manager?.username ?? '-'}</Text>
                        <Text>Status: {project.status}</Text>
                        <Text>Priority: {project.priority}</Text>
                        <Text>Start: {project.start_date ? formatDate(project.start_date) : '-'}</Text>
                        <Text>End: {project.end_date ? formatDate(project.end_date) : '-'}</Text>
                    </Group>
                </Card>

                <Card withBorder>
                    <Text fw={500} mb="xs">Team Members</Text>
                    <Group gap="xs">
                        {(project.team_members || []).map((u: any) => (
                            <Badge key={u.id} variant="light">{u.username}</Badge>
                        ))}
                    </Group>
                </Card>

                <Card withBorder>
                    <Text fw={500} mb="xs">Tasks</Text>
                    <Text size="sm" c="dimmed">Total: {project.total_tasks} • Completed: {project.completed_tasks} • Progress: {project.progress_percentage}%</Text>
                </Card>
            </Stack>
        </Container>
    );
}

export default ProjectDetailPage;


