import React from 'react';
import {
    Grid,
    Card,
    Text,
    Group,
    Stack,
    Badge,
    Progress,
    ActionIcon,
    Button,
    SimpleGrid,
    ThemeIcon,
    Title,
    Divider,
    RingProgress,
    Center,
    Modal,
    Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconFolder,
    IconUsers,
    IconCalendar,
    IconCurrencyDollar,
    IconTrendingUp,
    IconPlus,
    IconRefresh,
    IconChartBar,
    IconClock,
    IconAlertTriangle,
} from '@tabler/icons-react';
import { useProjects } from '../../hooks/use-projects';
import { ProjectStats } from '../../types';
import { paths } from '@/routes/paths';
import { ProjectForm } from '../project-form/project-form';
import { formatNumber, formatCurrency, formatDate } from '../../../shared/utils';

interface ProjectDashboardProps {
    onNavigate?: (path: string) => void;
}

export function ProjectDashboard({ onNavigate }: ProjectDashboardProps) {
    const { stats, loading, refetchProjects, refetchStats, createProject } = useProjects();
    const [opened, { open, close }] = useDisclosure(false);

    const handleRefresh = () => {
        refetchProjects();
        refetchStats();
    };

    const StatCard = ({
        title,
        value,
        icon,
        color,
        description,
        onClick,
        trend
    }: {
        title: string;
        value: number;
        icon: React.ReactNode;
        color: string;
        description?: string;
        onClick?: () => void;
        trend?: { value: number; type: 'increase' | 'decrease' };
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
                {formatNumber(value)}
            </Text>
            {description && (
                <Text size="xs" c="dimmed" mt="xs">
                    {description}
                </Text>
            )}
            {trend && (
                <Group gap="xs" mt="xs">
                    <IconTrendingUp
                        size={12}
                        color={trend.type === 'increase' ? 'green' : 'red'}
                    />
                    <Text size="xs" c={trend.type === 'increase' ? 'green' : 'red'}>
                        {trend.value}% from last month
                    </Text>
                </Group>
            )}
        </Card>
    );

    const ProgressCard = ({
        title,
        value,
        total,
        color,
        icon
    }: {
        title: string;
        value: number;
        total: number;
        color: string;
        icon: React.ReactNode;
    }) => {
        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500} size="sm" c="dimmed">
                        {title}
                    </Text>
                    <ThemeIcon color={color} variant="light" size="lg">
                        {icon}
                    </ThemeIcon>
                </Group>
                <Center>
                    <RingProgress
                        size={80}
                        thickness={8}
                        sections={[{ value: percentage, color }]}
                        label={
                            <Text fw={700} size="lg">
                                {percentage}%
                            </Text>
                        }
                    />
                </Center>
                <Text ta="center" size="sm" c="dimmed" mt="md">
                    {formatNumber(value)} of {formatNumber(total)}
                </Text>
            </Card>
        );
    };

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <div>
                    <Title order={2}>Project Management</Title>
                    <Text c="dimmed" size="sm">
                        Monitor and manage all your projects
                    </Text>
                </div>
                <Group>
                    <Button
                        variant="outline"
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleRefresh}
                        loading={loading.projects || loading.stats}
                    >
                        Refresh
                    </Button>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={open}
                    >
                        Create Project
                    </Button>
                </Group>
            </Group>

            <Modal opened={opened} onClose={close} title="Create Project" size="lg">
                <Stack>
                    <ProjectForm
                        onSubmit={async (data) => {
                            await createProject(data);
                            close();
                            refetchProjects();
                            refetchStats();
                        }}
                    />
                    <Text size="sm" c="dimmed">
                        Prefer a full page?{' '}
                        <Anchor onClick={() => { close(); onNavigate?.(paths.app.projects.create); }}>Open full form</Anchor>
                    </Text>
                </Stack>
            </Modal>

            {/* Statistics Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                <StatCard
                    title="Total Projects"
                    value={stats?.total_projects || 0}
                    icon={<IconFolder size={20} />}
                    color="blue"
                    description="All projects in system"
                    onClick={() => onNavigate?.(paths.app.projects.root)}
                    trend={{ value: 12, type: 'increase' }}
                />
                <StatCard
                    title="Active Projects"
                    value={stats?.active_projects || 0}
                    icon={<IconTrendingUp size={20} />}
                    color="green"
                    description="Currently in progress"
                    onClick={() => onNavigate?.(paths.app.projects.root)}
                />
                <StatCard
                    title="Completed Projects"
                    value={stats?.completed_projects || 0}
                    icon={<IconChartBar size={20} />}
                    color="blue"
                    description="Successfully finished"
                    onClick={() => onNavigate?.(paths.app.projects.root)}
                />
                <StatCard
                    title="On Hold"
                    value={stats?.on_hold_projects || 0}
                    icon={<IconClock size={20} />}
                    color="orange"
                    description="Temporarily paused"
                    onClick={() => onNavigate?.(paths.app.projects.root)}
                />
            </SimpleGrid>

            {/* Progress Overview */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                <ProgressCard
                    title="Project Completion"
                    value={stats?.completed_projects || 0}
                    total={stats?.total_projects || 0}
                    color="green"
                    icon={<IconChartBar size={20} />}
                />
                <ProgressCard
                    title="Budget Utilization"
                    value={75}
                    total={100}
                    color="blue"
                    icon={<IconCurrencyDollar size={20} />}
                />
                <ProgressCard
                    title="Team Utilization"
                    value={stats?.team_utilization || 0}
                    total={100}
                    color="purple"
                    icon={<IconUsers size={20} />}
                />
            </SimpleGrid>

            {/* Budget Overview */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Budget Overview</Text>
                    <ThemeIcon color="green" variant="light">
                        <IconCurrencyDollar size={16} />
                    </ThemeIcon>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <div>
                        <Text size="sm" c="dimmed">Total Budget</Text>
                        <Text fw={700} size="lg">
                            {formatCurrency(stats?.total_budget || 0)}
                        </Text>
                    </div>
                    <div>
                        <Text size="sm" c="dimmed">Used Budget</Text>
                        <Text fw={700} size="lg" c="orange">
                            {formatCurrency((stats?.total_budget || 0) * 0.75)}
                        </Text>
                    </div>
                    <div>
                        <Text size="sm" c="dimmed">Remaining</Text>
                        <Text fw={700} size="lg" c="green">
                            {formatCurrency((stats?.total_budget || 0) * 0.25)}
                        </Text>
                    </div>
                </SimpleGrid>
            </Card>

            {/* Quick Actions */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Quick Actions</Text>
                    <ThemeIcon color="blue" variant="light">
                        <IconChartBar size={16} />
                    </ThemeIcon>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconFolder size={16} />}
                        onClick={() => onNavigate?.(paths.app.projects.root)}
                    >
                        View All Projects
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconPlus size={16} />}
                        onClick={() => onNavigate?.(paths.app.projects.create)}
                    >
                        Create Project
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconCalendar size={16} />}
                        onClick={() => onNavigate?.(paths.app.projects.timeline)}
                    >
                        Project Timeline
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconChartBar size={16} />}
                        onClick={() => onNavigate?.(paths.app.projects.reports)}
                    >
                        Project Reports
                    </Button>
                </SimpleGrid>
            </Card>
        </Stack>
    );
}
