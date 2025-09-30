import React from 'react';
import {
    Grid,
    Card,
    Text,
    Group,
    Stack,
    Badge,
    ActionIcon,
    Button,
    SimpleGrid,
    ThemeIcon,
    Title,
    Divider,
    Progress,
    RingProgress,
    Center,
    Alert,
} from '@mantine/core';
import {
    IconChartBar,
    IconUsers,
    IconClock,
    IconTrendingUp,
    IconFileText,
    IconDownload,
    IconPlus,
    IconRefresh,
    IconSettings,
    IconEye,
    IconEdit,
    IconTrash,
    IconCalendar,
} from '@tabler/icons-react';
import { formatNumber, formatDate } from '../../../shared/utils';

interface ReportingDashboardProps {
    onNavigate?: (path: string) => void;
}

export function ReportingDashboard({ onNavigate }: ReportingDashboardProps) {
    const handleRefresh = () => {
        // Refresh logic
    };

    const StatCard = ({
        title,
        value,
        icon,
        color,
        description,
        onClick
    }: {
        title: string;
        value: number | string;
        icon: React.ReactNode;
        color: string;
        description?: string;
        onClick?: () => void;
    }) => (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick}
        >
            <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm" c="dimmed">
                    {title}
                </Text>
                <ThemeIcon color={color} variant="light" size="lg">
                    {icon}
                </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
                {value}
            </Text>
            {description && (
                <Text size="xs" c="dimmed" mt="xs">
                    {description}
                </Text>
            )}
        </Card>
    );

    const ReportCard = ({
        title,
        description,
        type,
        lastRun,
        status
    }: {
        title: string;
        description: string;
        type: string;
        lastRun: string;
        status: 'active' | 'inactive' | 'error';
    }) => (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm">
                    {title}
                </Text>
                <Badge
                    color={status === 'active' ? 'green' : status === 'error' ? 'red' : 'gray'}
                    size="sm"
                >
                    {status}
                </Badge>
            </Group>

            <Text size="xs" c="dimmed" mb="xs">
                {description}
            </Text>

            <Group justify="space-between" mb="md">
                <Text size="xs" c="dimmed">
                    Type: {type}
                </Text>
                <Text size="xs" c="dimmed">
                    Last run: {lastRun}
                </Text>
            </Group>

            <Group justify="space-between">
                <Group gap="xs">
                    <ActionIcon variant="light" color="blue" size="sm">
                        <IconEye size={14} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="orange" size="sm">
                        <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm">
                        <IconTrash size={14} />
                    </ActionIcon>
                </Group>
                <Button variant="light" size="xs">
                    Run
                </Button>
            </Group>
        </Card>
    );

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <div>
                    <Title order={2}>Reports & Analytics</Title>
                    <Text c="dimmed" size="sm">
                        Generate and manage reports for your organization
                    </Text>
                </div>
                <Group>
                    <Button
                        variant="outline"
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => onNavigate?.('/app/reporting/custom')}
                    >
                        Create Report
                    </Button>
                </Group>
            </Group>

            {/* Statistics Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                <StatCard
                    title="Total Reports"
                    value={24}
                    icon={<IconFileText size={20} />}
                    color="blue"
                    description="All reports in system"
                    onClick={() => onNavigate?.('/app/reporting')}
                />
                <StatCard
                    title="Scheduled Reports"
                    value={8}
                    icon={<IconCalendar size={20} />}
                    color="green"
                    description="Automatically generated"
                    onClick={() => onNavigate?.('/app/reporting/scheduled')}
                />
                <StatCard
                    title="Reports Generated"
                    value={156}
                    icon={<IconDownload size={20} />}
                    color="purple"
                    description="This month"
                />
                <StatCard
                    title="Data Sources"
                    value={12}
                    icon={<IconChartBar size={20} />}
                    color="orange"
                    description="Connected systems"
                />
            </SimpleGrid>

            {/* Quick Actions */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Quick Actions</Text>
                    <ThemeIcon color="blue" variant="light">
                        <IconSettings size={16} />
                    </ThemeIcon>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconUsers size={16} />}
                        onClick={() => onNavigate?.('/app/reporting/employee-productivity')}
                    >
                        Employee Productivity
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconChartBar size={16} />}
                        onClick={() => onNavigate?.('/app/reporting/project-progress')}
                    >
                        Project Progress
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconClock size={16} />}
                        onClick={() => onNavigate?.('/app/reporting/time-tracking')}
                    >
                        Time Tracking
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconFileText size={16} />}
                        onClick={() => onNavigate?.('/app/reporting/custom')}
                    >
                        Custom Reports
                    </Button>
                </SimpleGrid>
            </Card>

            {/* Recent Reports */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Recent Reports</Text>
                    <Button variant="light" size="sm">
                        View All
                    </Button>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                    <ReportCard
                        title="Monthly Productivity Report"
                        description="Employee productivity metrics for the current month"
                        type="Employee Productivity"
                        lastRun="2 hours ago"
                        status="active"
                    />
                    <ReportCard
                        title="Project Status Overview"
                        description="Current status of all active projects"
                        type="Project Progress"
                        lastRun="1 day ago"
                        status="active"
                    />
                    <ReportCard
                        title="Time Tracking Summary"
                        description="Weekly time tracking summary for all users"
                        type="Time Tracking"
                        lastRun="3 days ago"
                        status="active"
                    />
                </SimpleGrid>
            </Card>

            {/* Report Templates */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Report Templates</Text>
                    <Button variant="light" size="sm">
                        Manage Templates
                    </Button>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                    <Card shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text fw={500} size="sm">Employee Productivity</Text>
                            <Badge color="blue" size="sm">Template</Badge>
                        </Group>
                        <Text size="xs" c="dimmed" mb="md">
                            Standard employee productivity report template
                        </Text>
                        <Button variant="light" size="xs" fullWidth>
                            Use Template
                        </Button>
                    </Card>

                    <Card shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text fw={500} size="sm">Project Progress</Text>
                            <Badge color="green" size="sm">Template</Badge>
                        </Group>
                        <Text size="xs" c="dimmed" mb="md">
                            Project progress tracking template
                        </Text>
                        <Button variant="light" size="xs" fullWidth>
                            Use Template
                        </Button>
                    </Card>

                    <Card shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text fw={500} size="sm">Time Tracking</Text>
                            <Badge color="purple" size="sm">Template</Badge>
                        </Group>
                        <Text size="xs" c="dimmed" mb="md">
                            Time tracking and billing report template
                        </Text>
                        <Button variant="light" size="xs" fullWidth>
                            Use Template
                        </Button>
                    </Card>

                    <Card shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <Text fw={500} size="sm">Custom Report</Text>
                            <Badge color="orange" size="sm">Template</Badge>
                        </Group>
                        <Text size="xs" c="dimmed" mb="md">
                            Create your own custom report
                        </Text>
                        <Button variant="light" size="xs" fullWidth>
                            Create New
                        </Button>
                    </Card>
                </SimpleGrid>
            </Card>
        </Stack>
    );
}
