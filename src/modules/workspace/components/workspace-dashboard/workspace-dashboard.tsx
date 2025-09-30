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
    Timeline,
    Avatar,
    Alert,
} from '@mantine/core';
import {
    IconClock,
    IconChecklist,
    IconTrendingUp,
    IconCalendar,
    IconPlay,
    IconPause,
    IconStop,
    IconPlus,
    IconRefresh,
    IconAlertTriangle,
    IconCheck,
    IconX,
    IconUser,
    IconCalendarEvent,
} from '@tabler/icons-react';
import { useWorkspace } from '../../hooks/use-workspace';
import { formatNumber, formatDate, formatTime, getRelativeTime } from '../../../shared/utils';

interface WorkspaceDashboardProps {
    onNavigate?: (path: string) => void;
}

export function WorkspaceDashboard({ onNavigate }: WorkspaceDashboardProps) {
    const {
        dashboard,
        stats,
        loading,
        refetchDashboard,
        startTimer,
        stopTimer,
        pauseTimer,
        resumeTimer
    } = useWorkspace();

    const handleRefresh = () => {
        refetchDashboard();
    };

    const handleTimerAction = async (taskId: number, action: 'start' | 'stop' | 'pause' | 'resume') => {
        try {
            switch (action) {
                case 'start':
                    await startTimer(taskId);
                    break;
                case 'stop':
                    await stopTimer(taskId);
                    break;
                case 'pause':
                    await pauseTimer(taskId);
                    break;
                case 'resume':
                    await resumeTimer(taskId);
                    break;
            }
        } catch (error) {
            console.error('Timer action failed:', error);
        }
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
        value: number | string;
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
                {value}
            </Text>
            {description && (
                <Text size="xs" c="dimmed" mt="xs">
                    {description}
                </Text>
            )}
        </Card>
    );

    const TaskCard = ({ task }: { task: any }) => (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm" lineClamp={1}>
                    {task.title}
                </Text>
                <Badge
                    color={task.status === 'completed' ? 'green' : task.status === 'in_progress' ? 'blue' : 'gray'}
                    size="sm"
                >
                    {task.status.replace('_', ' ')}
                </Badge>
            </Group>

            <Text size="xs" c="dimmed" mb="md" lineClamp={2}>
                {task.description || 'No description'}
            </Text>

            <Group justify="space-between" mb="md">
                <Text size="xs" c="dimmed">
                    Due: {task.due_date ? formatDate(task.due_date) : 'No deadline'}
                </Text>
                <Text size="xs" c="dimmed">
                    {task.estimated_hours ? `${task.estimated_hours}h estimated` : 'No estimate'}
                </Text>
            </Group>

            <Progress value={task.progress || 0} size="sm" mb="md" />

            <Group justify="space-between">
                <Group gap="xs">
                    <ActionIcon
                        variant="light"
                        color="green"
                        size="sm"
                        onClick={() => handleTimerAction(task.id, 'start')}
                    >
                        <IconPlay size={14} />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        color="orange"
                        size="sm"
                        onClick={() => handleTimerAction(task.id, 'pause')}
                    >
                        <IconPause size={14} />
                    </ActionIcon>
                    <ActionIcon
                        variant="light"
                        color="red"
                        size="sm"
                        onClick={() => handleTimerAction(task.id, 'stop')}
                    >
                        <IconStop size={14} />
                    </ActionIcon>
                </Group>
                <Button
                    variant="light"
                    size="xs"
                    onClick={() => onNavigate?.(`/tasks/${task.id}`)}
                >
                    View
                </Button>
            </Group>
        </Card>
    );

    if (loading.dashboard) {
        return (
            <Stack gap="md">
                <Text>Loading workspace...</Text>
            </Stack>
        );
    }

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <div>
                    <Title order={2}>My Workspace</Title>
                    <Text c="dimmed" size="sm">
                        Welcome back, {dashboard?.user.first_name || 'User'}! Here's your work overview.
                    </Text>
                </div>
                <Group>
                    <Button
                        variant="outline"
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleRefresh}
                        loading={loading.dashboard}
                    >
                        Refresh
                    </Button>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => onNavigate?.('/workspace/timelogs/create')}
                    >
                        Log Time
                    </Button>
                </Group>
            </Group>

            {/* Time Tracking Stats */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                <StatCard
                    title="Today's Hours"
                    value={`${stats?.today_hours || 0}h`}
                    icon={<IconClock size={20} />}
                    color="blue"
                    description="Hours logged today"
                />
                <StatCard
                    title="This Week"
                    value={`${stats?.week_hours || 0}h`}
                    icon={<IconTrendingUp size={20} />}
                    color="green"
                    description="Hours this week"
                />
                <StatCard
                    title="This Month"
                    value={`${stats?.month_hours || 0}h`}
                    icon={<IconCalendar size={20} />}
                    color="purple"
                    description="Hours this month"
                />
                <StatCard
                    title="Productivity"
                    value={`${dashboard?.productivity_score || 0}%`}
                    icon={<IconChecklist size={20} />}
                    color="orange"
                    description="Your productivity score"
                />
            </SimpleGrid>

            {/* Main Content Grid */}
            <Grid>
                {/* Assigned Tasks */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="md">
                            <Text fw={500}>My Tasks</Text>
                            <Button
                                variant="light"
                                size="sm"
                                onClick={() => onNavigate?.('/workspace/tasks')}
                            >
                                View All
                            </Button>
                        </Group>

                        {dashboard?.assigned_tasks && dashboard.assigned_tasks.length > 0 ? (
                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                {dashboard.assigned_tasks.slice(0, 4).map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Alert
                                icon={<IconChecklist size={16} />}
                                title="No tasks assigned"
                                color="blue"
                                variant="light"
                            >
                                You don't have any tasks assigned at the moment.
                            </Alert>
                        )}
                    </Card>
                </Grid.Col>

                {/* Quick Actions & Recent Activity */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="md">
                        {/* Quick Actions */}
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text fw={500} mb="md">Quick Actions</Text>
                            <Stack gap="sm">
                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconPlay size={16} />}
                                    onClick={() => onNavigate?.('/workspace/timer')}
                                >
                                    Start Timer
                                </Button>
                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconPlus size={16} />}
                                    onClick={() => onNavigate?.('/workspace/timelogs/create')}
                                >
                                    Log Time
                                </Button>
                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconCalendar size={16} />}
                                    onClick={() => onNavigate?.('/workspace/calendar')}
                                >
                                    View Calendar
                                </Button>
                                <Button
                                    variant="light"
                                    fullWidth
                                    leftSection={<IconChecklist size={16} />}
                                    onClick={() => onNavigate?.('/workspace/tasks')}
                                >
                                    My Tasks
                                </Button>
                            </Stack>
                        </Card>

                        {/* Recent Activity */}
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text fw={500} mb="md">Recent Activity</Text>
                            {dashboard?.recent_activities && dashboard.recent_activities.length > 0 ? (
                                <Timeline active={-1} bulletSize={24} lineWidth={2}>
                                    {dashboard.recent_activities.slice(0, 5).map((activity) => (
                                        <Timeline.Item
                                            key={activity.id}
                                            bullet={<IconUser size={12} />}
                                            title={activity.title}
                                        >
                                            <Text size="sm" c="dimmed">
                                                {activity.description}
                                            </Text>
                                            <Text size="xs" c="dimmed" mt={4}>
                                                {getRelativeTime(activity.timestamp)}
                                            </Text>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            ) : (
                                <Text size="sm" c="dimmed">
                                    No recent activity
                                </Text>
                            )}
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>

            {/* Upcoming Deadlines */}
            {dashboard?.upcoming_deadlines && dashboard.upcoming_deadlines.length > 0 && (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="md">
                        <Text fw={500}>Upcoming Deadlines</Text>
                        <Button
                            variant="light"
                            size="sm"
                            onClick={() => onNavigate?.('/workspace/calendar')}
                        >
                            View Calendar
                        </Button>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                        {dashboard.upcoming_deadlines.map((task) => (
                            <Card key={task.id} shadow="sm" padding="md" radius="md" withBorder>
                                <Group justify="space-between" mb="xs">
                                    <Text fw={500} size="sm" lineClamp={1}>
                                        {task.title}
                                    </Text>
                                    <Badge color="orange" size="sm">
                                        Due Soon
                                    </Badge>
                                </Group>
                                <Text size="xs" c="dimmed">
                                    Due: {formatDate(task.due_date || '')}
                                </Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Card>
            )}
        </Stack>
    );
}
