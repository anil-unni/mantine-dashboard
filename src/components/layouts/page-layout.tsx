import React from 'react';
import { Box, BoxProps } from '@mantine/core';
import { PageHeader } from '@/components/page-header';

export interface PageLayoutProps extends BoxProps {
    title: string;
    description?: string;
    rightSection?: React.ReactNode;
    children: React.ReactNode;
    loading?: boolean;
    loadingComponent?: React.ReactNode;
}

export function PageLayout({
    title,
    description,
    rightSection,
    children,
    loading = false,
    loadingComponent,
    ...props
}: PageLayoutProps) {
    if (loading && loadingComponent) {
        return <Box p="md">{loadingComponent}</Box>;
    }

    return (
        <Box p="md" {...props}>
            <PageHeader
                title={title}
                description={description}
                rightSection={rightSection}
            />
            {children}
        </Box>
    );
}
