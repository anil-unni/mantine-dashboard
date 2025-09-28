import { Card, Group, Text, Title, Skeleton, Badge } from '@mantine/core';
import { IconClock, IconUsers, IconShoppingCart, IconMessageCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type { RealTimeMetrics as RealTimeMetricsType } from '@/api/entities/dashboard';

interface RealTimeMetricsProps {
    data?: RealTimeMetricsType;
    isLoading?: boolean;
}

export function RealTimeMetrics({ data, isLoading }: RealTimeMetricsProps) {
    if (isLoading) {
        return (
            <Card p="md">
                <Group mb="md">
                    <IconClock size={20} />
                    <Title order={4}>Real-time Metrics</Title>
                </Group>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton height={20} mb="xs" />
                            <Skeleton height={32} />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card p="md">
                <Group mb="md">
                    <IconClock size={20} />
                    <Title order={4}>Real-time Metrics</Title>
                    <Badge color="gray" variant="light" size="sm">
                        Unavailable
                    </Badge>
                </Group>
                <Text c="dimmed" size="sm">
                    Real-time metrics are currently unavailable. Please check back later.
                </Text>
            </Card>
        );
    }

    const metrics = [
        {
            title: 'Last 24 Hours',
            data: data.last24Hours,
            color: 'blue',
        },
        {
            title: 'Last Hour',
            data: data.lastHour,
            color: 'green',
        },
    ];

    return (
        <Card p="md">
            <Group mb="md">
                <IconClock size={20} />
                <Title order={4}>Real-time Metrics</Title>
                <Badge color="green" variant="light" size="sm">
                    Live
                </Badge>
            </Group>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {metrics.map(({ title, data: metricData, color }) => (
                    <div key={title}>
                        <Text size="sm" c="dimmed" mb="xs">
                            {title}
                        </Text>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <IconUsers size={16} color={`var(--mantine-color-${color}-6)`} />
                                <Text fw={500}>{metricData.users}</Text>
                                <Text size="sm" c="dimmed">users</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <IconShoppingCart size={16} color={`var(--mantine-color-${color}-6)`} />
                                <Text fw={500}>{metricData.orders}</Text>
                                <Text size="sm" c="dimmed">orders</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <IconMessageCircle size={16} color={`var(--mantine-color-${color}-6)`} />
                                <Text fw={500}>{metricData.queries}</Text>
                                <Text size="sm" c="dimmed">queries</Text>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Text size="xs" c="dimmed" mt="md">
                Last updated: {dayjs(data.timestamp).format('MMM DD, YYYY HH:mm:ss')}
            </Text>
        </Card>
    );
}
