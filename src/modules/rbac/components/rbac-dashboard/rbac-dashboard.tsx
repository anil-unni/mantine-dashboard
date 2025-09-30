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
} from '@mantine/core';
import {
    IconUsers,
    IconShield,
    IconKey,
    IconUserCheck,
    IconPlus,
    IconRefresh,
    IconChartBar,
} from '@tabler/icons-react';
import { useRBAC } from '../../hooks/use-rbac';
import { RBACStats } from '../../types';
import { formatNumber } from '../../../shared/utils';

interface RBACDashboardProps {
    onNavigate?: (path: string) => void;
}

export function RBACDashboard({ onNavigate }: RBACDashboardProps) {
    const { stats, loading, refetchRoles, refetchPermissions, refetchUsers } = useRBAC();

    const handleRefresh = () => {
        refetchRoles();
        refetchPermissions();
        refetchUsers();
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
        value: number;
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
                {formatNumber(value)}
            </Text>
            {description && (
                <Text size="xs" c="dimmed" mt="xs">
                    {description}
                </Text>
            )}
        </Card>
    );

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <div>
                    <Title order={2}>Role-Based Access Control</Title>
                    <Text c="dimmed" size="sm">
                        Manage user roles, permissions, and access control
                    </Text>
                </div>
                <Group>
                    <Button
                        variant="outline"
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleRefresh}
                        loading={loading.roles || loading.permissions || loading.users}
                    >
                        Refresh
                    </Button>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        onClick={() => onNavigate?.('/rbac/roles/create')}
                    >
                        Create Role
                    </Button>
                </Group>
            </Group>

            {/* Statistics Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
                <StatCard
                    title="Total Users"
                    value={stats?.total_users || 0}
                    icon={<IconUsers size={20} />}
                    color="blue"
                    description="Active users in system"
                    onClick={() => onNavigate?.('/rbac/users')}
                />
                <StatCard
                    title="Total Roles"
                    value={stats?.total_roles || 0}
                    icon={<IconShield size={20} />}
                    color="green"
                    description="Defined user roles"
                    onClick={() => onNavigate?.('/rbac/roles')}
                />
                <StatCard
                    title="Total Permissions"
                    value={stats?.total_permissions || 0}
                    icon={<IconKey size={20} />}
                    color="orange"
                    description="System permissions"
                    onClick={() => onNavigate?.('/rbac/permissions')}
                />
                <StatCard
                    title="Active Assignments"
                    value={stats?.active_assignments || 0}
                    icon={<IconUserCheck size={20} />}
                    color="purple"
                    description="User role assignments"
                />
            </SimpleGrid>

            {/* Quick Actions */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Quick Actions</Text>
                    <ThemeIcon color="blue" variant="light">
                        <IconChartBar size={16} />
                    </ThemeIcon>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconShield size={16} />}
                        onClick={() => onNavigate?.('/rbac/roles')}
                    >
                        Manage Roles
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconKey size={16} />}
                        onClick={() => onNavigate?.('/rbac/permissions')}
                    >
                        Manage Permissions
                    </Button>
                    <Button
                        variant="light"
                        fullWidth
                        leftSection={<IconUserCheck size={16} />}
                        onClick={() => onNavigate?.('/rbac/assignments')}
                    >
                        User Assignments
                    </Button>
                </SimpleGrid>
            </Card>

            {/* Recent Activity */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Text fw={500}>Recent Activity</Text>
                    <ActionIcon variant="subtle">
                        <IconRefresh size={16} />
                    </ActionIcon>
                </Group>

                <Stack gap="xs">
                    <Text size="sm" c="dimmed">
                        No recent activity to display
                    </Text>
                </Stack>
            </Card>
        </Stack>
    );
}
