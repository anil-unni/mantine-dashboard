import { Card, Title, Text, Group, Stack, RingProgress, Badge } from '@mantine/core';
import { useGetNewsMetrics } from '@/hooks/api';

export default function NewsMetricsWidget() {
    const { data: metrics, isLoading } = useGetNewsMetrics();

    if (isLoading || !metrics) {
        return (
            <Card>
                <Title order={3} mb="md">
                    News Metrics
                </Title>
                <Text c="dimmed">Loading...</Text>
            </Card>
        );
    }

    const publishedPercentage = (metrics.publishedArticles / metrics.totalArticles) * 100;
    const draftPercentage = (metrics.draftArticles / metrics.totalArticles) * 100;

    return (
        <Card>
            <Title order={3} mb="md">
                News Metrics
            </Title>

            <Stack gap="lg">
                {/* Overview Stats */}
                <Group grow>
                    <div>
                        <Text size="lg" fw={700}>
                            {metrics.totalArticles}
                        </Text>
                        <Text size="sm" c="dimmed">
                            Total Articles
                        </Text>
                    </div>
                    <div>
                        <Text size="lg" fw={700} c="green">
                            {metrics.publishedArticles}
                        </Text>
                        <Text size="sm" c="dimmed">
                            Published
                        </Text>
                    </div>
                    <div>
                        <Text size="lg" fw={700} c="gray">
                            {metrics.draftArticles}
                        </Text>
                        <Text size="sm" c="dimmed">
                            Drafts
                        </Text>
                    </div>
                </Group>

                {/* Progress Ring */}
                <Group justify="center">
                    <RingProgress
                        size={120}
                        thickness={12}
                        sections={[
                            { value: publishedPercentage, color: 'green', tooltip: 'Published' },
                            { value: draftPercentage, color: 'gray', tooltip: 'Drafts' },
                        ]}
                        label={
                            <Text ta="center" size="xs" fw={700}>
                                {publishedPercentage.toFixed(1)}%
                            </Text>
                        }
                    />
                </Group>

                {/* Additional Stats */}
                <Stack gap="sm">
                    <Group justify="space-between">
                        <Text size="sm">Total Views</Text>
                        <Text size="sm" fw={600}>
                            {metrics.totalViews.toLocaleString()}
                        </Text>
                    </Group>
                    <Group justify="space-between">
                        <Text size="sm">Average Read Time</Text>
                        <Text size="sm" fw={600}>
                            {metrics.averageReadTime.toFixed(1)} min
                        </Text>
                    </Group>
                </Stack>

                {/* Top Categories */}
                <div>
                    <Text size="sm" fw={600} mb="xs">
                        Top Categories
                    </Text>
                    <Stack gap="xs">
                        {metrics.topCategories.slice(0, 3).map((category) => (
                            <Group key={category.category} justify="space-between">
                                <Badge variant="light" size="sm">
                                    {category.category}
                                </Badge>
                                <Text size="sm" c="dimmed">
                                    {category.count} articles
                                </Text>
                            </Group>
                        ))}
                    </Stack>
                </div>
            </Stack>
        </Card>
    );
}

