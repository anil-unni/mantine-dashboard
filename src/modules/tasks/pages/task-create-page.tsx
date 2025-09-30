import React from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskFormData } from '../types';
import { useTasks } from '../hooks/use-tasks';

export function TaskCreatePage() {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const { createTask } = useTasks(projectId ? parseInt(projectId) : 0);

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Tasks', href: '/app/tasks' },
        { title: 'Create Task', href: '/app/tasks/create' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const handleCreateTask = async (data: TaskFormData) => {
        try {
            if (projectId) {
                await createTask(parseInt(projectId), data);
                navigate(`/app/projects/${projectId}`);
            } else {
                // Handle general task creation
                navigate('/app/tasks');
            }
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>

            <Stack gap="lg">
                <div>
                    <Title order={2}>Create New Task</Title>
                    <Text c="dimmed" size="sm">
                        Fill out the form below to create a new task
                    </Text>
                </div>

                <Card withBorder>
                    <Text c="dimmed">
                        Task creation form will be implemented here.
                    </Text>
                </Card>
            </Stack>
        </Container>
    );
}
