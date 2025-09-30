import React from 'react';
import { Box, Text, Button, Stack } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';

interface DataTableEmptyProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function DataTableEmpty({
    title = 'No data found',
    description = 'There are no records to display at the moment.',
    actionLabel,
    onAction,
}: DataTableEmptyProps) {
    return (
        <Box ta="center" py="xl">
            <Stack align="center" gap="md">
                <IconInbox size={48} stroke={1} color="var(--mantine-color-dimmed)" />
                <Stack gap="xs" align="center">
                    <Text fw={500} size="lg">
                        {title}
                    </Text>
                    <Text c="dimmed" size="sm">
                        {description}
                    </Text>
                </Stack>
                {actionLabel && onAction && (
                    <Button onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </Stack>
        </Box>
    );
}
