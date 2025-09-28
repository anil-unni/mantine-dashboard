// import { Page } from '@/components/page';
import { Container, Stack, Title, Text, Group, Button, Alert } from '@mantine/core';
import { IconRefresh, IconAlertCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';

import {
    SummaryCardsGrid,
    ChartsSection,
    RecentDataTables,
    RealTimeMetrics
} from '@/components/dashboard';
import { useDashboardOverview, useRealTimeMetrics } from '@/hooks/api/dashboard';

export default function DashboardOverviewPage() {
    // Fetch dashboard data
    const {
        data: overviewData,
        isLoading: overviewLoading,
        error: overviewError,
        refetch: refetchOverview
    } = useDashboardOverview();

    const {
        data: realTimeData,
        isLoading: realTimeLoading,
        error: realTimeError
    } = useRealTimeMetrics();


    const handleRefresh = () => {
        refetchOverview();
    };

    return (
        <div>
            <Container size="xl">
                <Stack gap="xl">
                    {/* Header with controls */}
                    <Group justify="space-between" align="center">
                        <div>
                            <Title order={2}>Dashboard Overview</Title>
                            <Text c="dimmed">
                                Real-time dashboard metrics and analytics
                            </Text>
                        </div>

                        <Button
                            leftSection={<IconRefresh size={16} />}
                            onClick={handleRefresh}
                            loading={overviewLoading}
                        >
                            Refresh
                        </Button>
                    </Group>

                    {/* Error handling */}
                    {overviewError && (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Error loading dashboard data"
                            color="red"
                        >
                            {overviewError.message || 'Failed to load dashboard data. Please try again.'}
                        </Alert>
                    )}

                    {/* Real-time metrics */}
                    <RealTimeMetrics
                        data={realTimeData?.result}
                        isLoading={realTimeLoading}
                    />

                    {/* Summary cards */}
                    <div>
                        <Title order={3} mb="md">Key Metrics</Title>
                        <SummaryCardsGrid
                            data={overviewData?.result?.summaryCards}
                            isLoading={overviewLoading}
                        />
                    </div>

                    {/* Charts section */}
                    <div>
                        <Title order={3} mb="md">Analytics & Charts</Title>
                        <ChartsSection
                            data={overviewData?.result?.charts}
                            isLoading={overviewLoading}
                        />
                    </div>

                    {/* Recent data tables */}
                    <div>
                        <Title order={3} mb="md">Recent Activity</Title>
                        <RecentDataTables
                            data={overviewData?.result?.tables}
                            isLoading={overviewLoading}
                        />
                    </div>

                    {/* Data metadata */}
                    {overviewData?.result?.metadata && (
                        <Alert
                            icon={<IconRefresh size={16} />}
                            title="Data Information"
                            color="blue"
                        >
                            <Text size="sm">
                                Last updated: {dayjs(overviewData.result.metadata.lastUpdated).format('MMM DD, YYYY HH:mm:ss')}
                                <br />
                                Cache expires in: {Math.floor(overviewData.result.metadata.cacheExpiry / 60)} minutes
                            </Text>
                        </Alert>
                    )}
                </Stack>
            </Container>
        </div>
    );
}
