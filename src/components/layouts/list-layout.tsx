import React from 'react';
import { Stack, Paper, Group, Box } from '@mantine/core';
import { PageLayout, PageLayoutProps } from './page-layout';

export interface ListLayoutProps extends Omit<PageLayoutProps, 'children'> {
    children: React.ReactNode;
    filters?: React.ReactNode;
    showFilters?: boolean;
    filtersCollapsible?: boolean;
    defaultFiltersOpen?: boolean;
    tableProps?: Record<string, any>;
}

export function ListLayout({
    children,
    filters,
    showFilters = true,
    filtersCollapsible = false,
    defaultFiltersOpen = true,
    tableProps = {},
    ...pageProps
}: ListLayoutProps) {
    const renderFilters = () => {
        if (!showFilters || !filters) return null;

        return (
            <Paper p="md" mb="md">
                {filters}
            </Paper>
        );
    };

    return (
        <PageLayout {...pageProps}>
            <Stack gap="md">
                {renderFilters()}
                <Box {...tableProps}>
                    {children}
                </Box>
            </Stack>
        </PageLayout>
    );
}
