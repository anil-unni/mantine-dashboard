import React from 'react';
import { Grid, Stack, Paper, Box } from '@mantine/core';
import { PageLayout, PageLayoutProps } from './page-layout';

export interface TwoColumnLayoutProps extends Omit<PageLayoutProps, 'children'> {
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
    leftSpan?: number | { base: number; sm: number; md: number; lg: number; xl: number };
    rightSpan?: number | { base: number; sm: number; md: number; lg: number; xl: number };
    gutter?: string | number;
    stickyRight?: boolean;
    rightStickyTop?: string | number;
}

export function TwoColumnLayout({
    leftContent,
    rightContent,
    leftSpan = { base: 12, sm: 12, md: 12, lg: 7, xl: 7 },
    rightSpan = { base: 12, sm: 12, md: 12, lg: 5, xl: 5 },
    gutter = 'lg',
    stickyRight = false,
    rightStickyTop = '1rem',
    ...pageProps
}: TwoColumnLayoutProps) {
    const rightContentStyle = stickyRight ? {
        position: 'sticky' as const,
        top: rightStickyTop,
    } : {};

    return (
        <PageLayout {...pageProps}>
            <Grid gutter={gutter} mt="md">
                <Grid.Col span={leftSpan}>
                    {leftContent}
                </Grid.Col>
                <Grid.Col span={rightSpan}>
                    <Box style={rightContentStyle}>
                        {rightContent}
                    </Box>
                </Grid.Col>
            </Grid>
        </PageLayout>
    );
}
