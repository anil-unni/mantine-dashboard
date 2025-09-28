import React from 'react';
import { Paper, Stack, Title } from '@mantine/core';

export interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
    description?: string;
}

export function FormSection({
    title,
    children,
    collapsible = false,
    defaultOpen = true,
    description,
}: FormSectionProps) {
    return (
        <Paper p="md">
            <Stack gap="md">
                <div>
                    <Title order={4} mb={description ? 'xs' : 0}>
                        {title}
                    </Title>
                    {description && (
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--mantine-color-dimmed)' }}>
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </Stack>
        </Paper>
    );
}
