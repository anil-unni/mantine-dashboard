import React from 'react';
import { Stack, Paper, Group, Button, Box } from '@mantine/core';
import { PageLayout, PageLayoutProps } from './page-layout';

export interface FormLayoutProps extends Omit<PageLayoutProps, 'children'> {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
    submitLabel?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    submitLoading?: boolean;
    submitDisabled?: boolean;
    showActions?: boolean;
    actionPosition?: 'left' | 'right' | 'center';
    sections?: Array<{
        title: string;
        children: React.ReactNode;
        collapsible?: boolean;
        defaultOpen?: boolean;
    }>;
}

export function FormLayout({
    children,
    onSubmit,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    onCancel,
    submitLoading = false,
    submitDisabled = false,
    showActions = true,
    actionPosition = 'right',
    sections = [],
    ...pageProps
}: FormLayoutProps) {
    const renderActions = () => {
        if (!showActions) return null;

        const actions = (
            <Group justify={actionPosition === 'left' ? 'flex-start' : actionPosition === 'center' ? 'center' : 'flex-end'}>
                {onCancel && (
                    <Button variant="light" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                )}
                <Button
                    type="submit"
                    loading={submitLoading}
                    disabled={submitDisabled}
                >
                    {submitLabel}
                </Button>
            </Group>
        );

        return actions;
    };

    const renderContent = () => {
        if (sections.length > 0) {
            return (
                <form onSubmit={onSubmit}>
                    <Stack gap="md">
                        {sections.map((section, index) => (
                            <Paper key={index} p="md">
                                <Stack gap="md">
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                                        {section.title}
                                    </h3>
                                    {section.children}
                                </Stack>
                            </Paper>
                        ))}
                        {renderActions()}
                    </Stack>
                </form>
            );
        }

        return (
            <form onSubmit={onSubmit}>
                <Stack gap="md">
                    {children}
                    {renderActions()}
                </Stack>
            </form>
        );
    };

    return (
        <PageLayout {...pageProps}>
            {renderContent()}
        </PageLayout>
    );
}
