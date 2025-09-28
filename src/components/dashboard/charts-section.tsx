import { Grid, Card, Title, Text, Skeleton } from '@mantine/core';
import { BarChart, LineChart, PieChart, DonutChart } from '@mantine/charts';
import type { Charts } from '@/api/entities/dashboard';

interface ChartsSectionProps {
    data?: Charts;
    isLoading?: boolean;
}

export function ChartsSection({ data, isLoading }: ChartsSectionProps) {
    if (isLoading) {
        return (
            <Grid>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                        <Card p="md">
                            <Skeleton height={20} mb="md" />
                            <Skeleton height={300} />
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        );
    }

    if (!data) return null;

    // Format data for Mantine charts
    const ordersByStatusData = data.ordersByStatus.map(item => ({
        name: item.status || 'Unknown',
        value: item.count,
        color: `var(--mantine-color-blue-${Math.floor(Math.random() * 6) + 3})`
    }));

    const ordersByMonthData = data.ordersByMonth.map(item => ({
        month: item.month || 'Unknown',
        orders: item.count,
        revenue: item.revenue || 0
    }));

    const usersByMonthData = data.usersByMonth.map(item => ({
        month: item.month || 'Unknown',
        users: item.count
    }));

    const packagesByTypeData = data.packagesByType.map(item => ({
        name: item.type || 'Unknown',
        value: item.count,
        color: `var(--mantine-color-green-${Math.floor(Math.random() * 6) + 3})`
    }));

    const paymentStatusData = data.paymentStatusDistribution.map(item => ({
        status: item.status || 'Unknown',
        count: item.count
    }));

    return (
        <Grid>
            {/* Orders by Status */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Orders by Status</Title>
                    <PieChart
                        data={ordersByStatusData}
                        size={300}
                        withTooltip
                        tooltipDataSource="segment"
                    />
                </Card>
            </Grid.Col>

            {/* Orders by Month */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Orders by Month</Title>
                    <BarChart
                        h={300}
                        data={ordersByMonthData}
                        dataKey="month"
                        series={[
                            { name: 'orders', color: 'blue.6' },
                            { name: 'revenue', color: 'green.6' }
                        ]}
                        withTooltip
                    />
                </Card>
            </Grid.Col>

            {/* Users by Month */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">User Growth</Title>
                    <LineChart
                        h={300}
                        data={usersByMonthData}
                        dataKey="month"
                        series={[
                            { name: 'users', color: 'teal.6' }
                        ]}
                        withTooltip
                    />
                </Card>
            </Grid.Col>

            {/* Revenue by Month */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Revenue by Month (INR)</Title>
                    <BarChart
                        h={300}
                        data={ordersByMonthData}
                        dataKey="month"
                        series={[
                            { name: 'revenue', color: 'green.6' }
                        ]}
                        withTooltip
                        valueFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    />
                </Card>
            </Grid.Col>

            {/* Packages by Type */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Packages by Type</Title>
                    <DonutChart
                        data={packagesByTypeData}
                        size={300}
                        withTooltip
                        tooltipDataSource="segment"
                    />
                </Card>
            </Grid.Col>

            {/* Payment Status Distribution */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Payment Status</Title>
                    <BarChart
                        h={300}
                        data={paymentStatusData}
                        dataKey="status"
                        series={[
                            { name: 'count', color: 'orange.6' }
                        ]}
                        withTooltip
                    />
                </Card>
            </Grid.Col>
        </Grid>
    );
}
