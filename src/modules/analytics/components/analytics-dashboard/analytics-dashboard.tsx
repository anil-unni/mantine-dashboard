import React from 'react';
import { Container, Title, Grid, Card, Text, Group, Badge, ActionIcon } from '@mantine/core';
import { IconRefresh, IconSettings } from '@tabler/icons-react';
import { useAnalytics } from '../../hooks/use-analytics';

export function AnalyticsDashboard() {
    const { dashboard, loading, actions } = useAnalytics();

    if (loading.dashboard) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <Container size="xl" py="md">
            <Group justify="space-between" mb="md">
                <Title order={2}>Analytics Dashboard</Title>
                <Group>
                    <ActionIcon
                        variant="light"
                        onClick={() => actions.refreshDashboard()}
                        loading={loading.dashboard}
                    >
                        <IconRefresh size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light">
                        <IconSettings size={16} />
                    </ActionIcon>
                </Group>
            </Group>

            <Grid>
                <Grid.Col span={12}>
                    <Card withBorder>
                        <Text size="lg" fw={500} mb="md">
                            Dashboard Overview
                        </Text>
                        <Text c="dimmed">
                            Analytics dashboard content will be displayed here.
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
