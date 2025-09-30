import React, { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    Group,
    Button,
    Burger,
    ScrollArea,
    NavLink,
    Avatar,
    Menu,
    UnstyledButton,
    Box,
    rem,
    useMantineTheme,
    Divider,
    Stack,
    Badge,
} from '@mantine/core';
import {
    IconDashboard,
    IconShield,
    IconFolder,
    IconChecklist,
    IconUser,
    IconChartBar,
    IconSettings,
    IconLogout,
    IconChevronDown,
    IconBell,
    IconSearch,
    IconMenu2,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { MODULE_CONFIGS, PERMISSIONS } from '../../modules/shared/constants';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useMantineTheme();

    const navigationItems = [
        {
            label: 'Dashboard',
            icon: IconDashboard,
            path: '/dashboard',
            color: 'blue',
        },
        {
            label: 'RBAC',
            icon: IconShield,
            path: '/rbac',
            color: 'red',
            permissions: [PERMISSIONS.RBAC.VIEW],
        },
        {
            label: 'Projects',
            icon: IconFolder,
            path: '/projects',
            color: 'green',
            permissions: [PERMISSIONS.PROJECTS.VIEW],
        },
        {
            label: 'Tasks',
            icon: IconChecklist,
            path: '/tasks',
            color: 'orange',
            permissions: [PERMISSIONS.TASKS.VIEW],
        },
        {
            label: 'Workspace',
            icon: IconUser,
            path: '/workspace',
            color: 'purple',
            permissions: [PERMISSIONS.WORKSPACE.VIEW],
        },
        {
            label: 'Reports',
            icon: IconChartBar,
            path: '/reporting',
            color: 'teal',
            permissions: [PERMISSIONS.REPORTS.VIEW],
        },
    ];

    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Text fw={700} size="lg">
                            Task Management System
                        </Text>
                    </Group>

                    <Group>
                        <Button
                            variant="subtle"
                            leftSection={<IconSearch size={16} />}
                            size="sm"
                        >
                            Search
                        </Button>
                        <Button
                            variant="subtle"
                            leftSection={<IconBell size={16} />}
                            size="sm"
                        >
                            Notifications
                        </Button>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <UnstyledButton>
                                    <Group gap="sm">
                                        <Avatar size="sm" radius="xl" color="blue">
                                            U
                                        </Avatar>
                                        <Box style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>
                                                John Doe
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                john@example.com
                                            </Text>
                                        </Box>
                                        <IconChevronDown size={14} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconUser size={14} />}>
                                    Profile
                                </Menu.Item>
                                <Menu.Item leftSection={<IconSettings size={14} />}>
                                    Settings
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item leftSection={<IconLogout size={14} />} color="red">
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <ScrollArea h="100%">
                    <Stack gap="xs">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.path}
                                label={item.label}
                                leftSection={<item.icon size={20} />}
                                rightSection={
                                    item.path === '/rbac' && (
                                        <Badge size="sm" color="red" variant="light">
                                            3
                                        </Badge>
                                    )
                                }
                                active={isActive(item.path)}
                                onClick={() => handleNavigation(item.path)}
                                color={item.color}
                                variant="light"
                            />
                        ))}
                    </Stack>

                    <Divider my="md" />

                    <Stack gap="xs">
                        <Text size="xs" fw={500} c="dimmed" tt="uppercase">
                            Quick Actions
                        </Text>
                        <Button
                            variant="light"
                            leftSection={<IconFolder size={16} />}
                            size="sm"
                            fullWidth
                            onClick={() => handleNavigation('/projects/create')}
                        >
                            New Project
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconChecklist size={16} />}
                            size="sm"
                            fullWidth
                            onClick={() => handleNavigation('/tasks/create')}
                        >
                            New Task
                        </Button>
                        <Button
                            variant="light"
                            leftSection={<IconUser size={16} />}
                            size="sm"
                            fullWidth
                            onClick={() => handleNavigation('/workspace/timelogs/create')}
                        >
                            Log Time
                        </Button>
                    </Stack>
                </ScrollArea>
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
