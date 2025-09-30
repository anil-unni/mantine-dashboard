import React from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { TimeLogFormData } from '../types';
import { useWorkspace } from '../hooks/use-workspace';

export function TimeLogCreatePage() {
    const navigate = useNavigate();
    const { actions } = useWorkspace();

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Workspace', href: '/app/workspace' },
        { title: 'Time Logs', href: '/app/workspace/timelogs' },
        { title: 'Create Time Log', href: '/app/workspace/timelogs/create' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const handleCreateTimeLog = async (data: TimeLogFormData) => {
        try {
            await actions.createTimeLog(data);
            navigate('/app/workspace/timelogs');
        } catch (error) {
            console.error('Failed to create time log:', error);
        }
    };

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>

            <Stack gap="lg">
                <div>
                    <Title order={2}>Log Time</Title>
                    <Text c="dimmed" size="sm">
                        Record time spent on tasks and projects
                    </Text>
                </div>

                <Card withBorder>
                    <Text c="dimmed">
                        Time log creation form will be implemented here.
                    </Text>
                </Card>
            </Stack>
        </Container>
    );
}
