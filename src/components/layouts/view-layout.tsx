import React from 'react';
import { Stack, Paper, Box } from '@mantine/core';
import { PageLayout, PageLayoutProps } from './page-layout';

export interface ViewLayoutProps extends Omit<PageLayoutProps, 'children'> {
    children: React.ReactNode;
    sections?: Array<{
        title: string;
        children: React.ReactNode;
        collapsible?: boolean;
        defaultOpen?: boolean;
    }>;
    showSections?: boolean;
}

export function ViewLayout({
    children,
    sections = [],
    showSections = true,
    ...pageProps
}: ViewLayoutProps) {
    const renderContent = () => {
        if (showSections && sections.length > 0) {
            return (
                <Stack gap="lg">
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
                </Stack>
            );
        }

        return (
            <Stack gap="lg">
                {children}
            </Stack>
        );
    };

    return (
        <PageLayout {...pageProps}>
            {renderContent()}
        </PageLayout>
    );
}
