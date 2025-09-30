import React from 'react';
import {
    Container,
    Title,
    Text,
    SimpleGrid,
    Card,
    Group,
    ThemeIcon,
    Stack,
    Button,
    Badge,
    Progress,
    RingProgress,
    Center,
    Alert,
    Box,
} from '@mantine/core';
import {
    IconFolder,
    IconChecklist,
    IconUsers,
    IconClock,
    IconTrendingUp,
    IconAlertTriangle,
    IconPlus,
    IconChartBar,
    IconShield,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { formatNumber, formatCurrency } from '../modules/shared/utils';

function DashboardPage() {
    const navigate = useNavigate();

    const stats = [
        {
            title: 'Total Projects',
            value: 24,
            icon: IconFolder,
            color: 'blue',
            change: '+12%',
            changeType: 'increase' as const,
        },
        {
            title: 'Active Tasks',
            value: 156,
            icon: IconChecklist,
            color: 'green',
            change: '+8%',
            changeType: 'increase' as const,
        },
        {
            title: 'Team Members',
            value: 12,
            icon: IconUsers,
            color: 'purple',
            change: '+2',
            changeType: 'increase' as const,
        },
        {
            title: 'Hours Logged',
            value: 1240,
            icon: IconClock,
            color: 'orange',
            change: '+15%',
            changeType: 'increase' as const,
        },
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'project_created',
            title: 'New project created',
            description: 'E-commerce Platform project was created',
            timestamp: '2 hours ago',
            user: 'John Doe',
        },
        {
            id: 2,
            type: 'task_completed',
            title: 'Task completed',
            description: 'User authentication module completed',
            timestamp: '4 hours ago',
            user: 'Jane Smith',
        },
        {
            id: 3,
            type: 'time_logged',
            title: 'Time logged',
            description: '8 hours logged on Project Alpha',
            timestamp: '6 hours ago',
            user: 'Mike Johnson',
        },
    ];

    const upcomingDeadlines = [
        {
            id: 1,
            title: 'Project Alpha - Phase 1',
            dueDate: '2024-01-15',
            priority: 'high',
            progress: 75,
        },
        {
            id: 2,
            title: 'User Interface Design',
            dueDate: '2024-01-18',
            priority: 'medium',
            progress: 60,
        },
        {
            id: 3,
            title: 'Database Migration',
            dueDate: '2024-01-20',
            priority: 'low',
            progress: 90,
        },
    ];

    const StatCard = ({
        title,
        value,
        icon: Icon,
        color,
        change,
        changeType
    }: {
        title: string;
        value: number;
        icon: React.ComponentType<any>;
        color: string;
        change: string;
        changeType: 'increase' | 'decrease';
    }) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text fw={500} size="sm" c="dimmed">
                    {title}
                </Text>
                <ThemeIcon color={color} variant="light" size="lg">
                    <Icon size={20} />
                </ThemeIcon>
            </Group>
            <Text fw={700} size="xl">
                {formatNumber(value)}
            </Text>
            <Text size="xs" c={changeType === 'increase' ? 'green' : 'red'}>
                {change} from last month
            </Text>
        </Card>
    );

    return (
        <Container size="xl" py="md">
            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between">
                    <div>
                        <Title order={2}>Dashboard</Title>
                        <Text c="dimmed" size="sm">
                            Welcome back! Here's what's happening with your projects.
                        </Text>
                    </div>
                    <Group>
                        <Button
                            variant="outline"
                            leftSection={<IconChartBar size={16} />}
                            onClick={() => navigate('/app/reporting')}
                        >
                            View Reports
                        </Button>
                        <Button
                            leftSection={<IconPlus size={16} />}
                            onClick={() => navigate('/app/projects/create')}
                        >
                            New Project
                        </Button>
                    </Group>
                </Group>

                {/* Statistics Cards */}
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </SimpleGrid>

                {/* Main Content Grid */}
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    {/* Recent Activities */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="md">
                            <Text fw={500}>Recent Activities</Text>
                            <Button variant="light" size="sm">
                                View All
                            </Button>
                        </Group>
                        <Stack gap="sm">
                            {recentActivities.map((activity) => (
                                <Group key={activity.id} gap="sm">
                                    <ThemeIcon color="blue" variant="light" size="sm">
                                        <IconTrendingUp size={14} />
                                    </ThemeIcon>
                                    <Box style={{ flex: 1 }}>
                                        <Text size="sm" fw={500}>
                                            {activity.title}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            {activity.description}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            {activity.timestamp} • {activity.user}
                                        </Text>
                                    </Box>
                                </Group>
                            ))}
                        </Stack>
                    </Card>

                    {/* Upcoming Deadlines */}
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="md">
                            <Text fw={500}>Upcoming Deadlines</Text>
                            <Button variant="light" size="sm">
                                View All
                            </Button>
                        </Group>
                        <Stack gap="md">
                            {upcomingDeadlines.map((deadline) => (
                                <Box key={deadline.id}>
                                    <Group justify="space-between" mb="xs">
                                        <Text size="sm" fw={500}>
                                            {deadline.title}
                                        </Text>
                                        <Badge
                                            color={
                                                deadline.priority === 'high' ? 'red' :
                                                    deadline.priority === 'medium' ? 'yellow' : 'green'
                                            }
                                            size="sm"
                                        >
                                            {deadline.priority}
                                        </Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed" mb="xs">
                                        Due: {deadline.dueDate}
                                    </Text>
                                    <Progress value={deadline.progress} size="sm" />
                                </Box>
                            ))}
                        </Stack>
                    </Card>
                </SimpleGrid>

                {/* Quick Actions */}
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text fw={500} mb="md">Quick Actions</Text>
                    <SimpleGrid cols={{ base: 2, sm: 4, md: 6 }}>
                        <Button
                            variant="light"
                            leftSection={<IconFolder size={16} />}
                            onClick={() => navigate('/app/projects')}
                        >
                            Projects
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconChecklist size={16} />}
                            onClick={() => navigate('/app/tasks')}
                        >
                            Tasks
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconUsers size={16} />}
                            onClick={() => navigate('/app/workspace')}
                        >
                            Workspace
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconShield size={16} />}
                            onClick={() => navigate('/app/rbac')}
                        >
                            RBAC
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconChartBar size={16} />}
                            onClick={() => navigate('/app/reporting')}
                        >
                            Reports
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconClock size={16} />}
                            onClick={() => navigate('/app/workspace/timelogs')}
                        >
                            Time Logs
                        </Button>
                    </SimpleGrid>
                </Card>

                {/* System Status */}
                <Alert
                    icon={<IconAlertTriangle size={16} />}
                    title="System Status"
                    color="blue"
                    variant="light"
                >
                    All systems are running normally. Last backup: 2 hours ago.
                </Alert>
            </Stack>
        </Container>
    );
}

export default DashboardPage;
