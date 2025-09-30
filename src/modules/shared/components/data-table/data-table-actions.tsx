import React from 'react';
import { Group, Button, Menu, ActionIcon, Tooltip } from '@mantine/core';
import { IconDots, IconDownload, IconRefresh, IconSettings } from '@tabler/icons-react';
import { ActionButton } from '../../types';

interface DataTableActionsProps {
    actions: ActionButton[];
}

export function DataTableActions({ actions }: DataTableActionsProps) {
    if (actions.length === 0) return null;

    const primaryActions = actions.slice(0, 2);
    const moreActions = actions.slice(2);

    return (
        <Group gap="xs">
            {primaryActions.map((action, index) => (
                <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    color={action.color}
                    leftSection={action.icon && <IconDownload size={16} />}
                    onClick={action.action}
                    disabled={action.disabled}
                    loading={action.loading}
                    size="sm"
                >
                    {action.label}
                </Button>
            ))}

            {moreActions.length > 0 && (
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon variant="outline" size="sm">
                            <IconDots size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {moreActions.map((action, index) => (
                            <Menu.Item
                                key={index}
                                leftSection={action.icon && <IconDownload size={16} />}
                                onClick={action.action}
                                disabled={action.disabled}
                            >
                                {action.label}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            )}
        </Group>
    );
}
