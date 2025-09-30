import React from 'react';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

interface DataTableErrorProps {
    error?: string;
    onRetry?: () => void;
}

export function DataTableError({ error, onRetry }: DataTableErrorProps) {
    return (
        <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error loading data"
            color="red"
            variant="light"
        >
            <Stack gap="md">
                <Text size="sm">
                    {error || 'An unexpected error occurred while loading the data.'}
                </Text>
                {onRetry && (
                    <Button
                        variant="light"
                        color="red"
                        leftSection={<IconRefresh size={16} />}
                        onClick={onRetry}
                        size="sm"
                    >
                        Try Again
                    </Button>
                )}
            </Stack>
        </Alert>
    );
}
