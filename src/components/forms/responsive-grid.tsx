import React from 'react';
import { Grid, GridProps } from '@mantine/core';

export interface ResponsiveGridProps extends Omit<GridProps, 'children' | 'columns'> {
    children: React.ReactNode;
    columns?: {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: string | number;
}

export function ResponsiveGrid({
    children,
    columns = { base: 1, sm: 2, lg: 2 },
    gap = 'md',
    ...props
}: ResponsiveGridProps) {
    const getSpan = (col: number) => {
        const totalCols = 12;
        return Math.floor(totalCols / col);
    };

    const spans = {
        base: columns.base ? getSpan(columns.base) : 12,
        sm: columns.sm ? getSpan(columns.sm) : 6,
        md: columns.md ? getSpan(columns.md) : 6,
        lg: columns.lg ? getSpan(columns.lg) : 6,
        xl: columns.xl ? getSpan(columns.xl) : 6,
    };

    return (
        <Grid gutter={gap} {...props}>
            {React.Children.map(children, (child, index) => (
                <Grid.Col key={index} span={spans}>
                    {child}
                </Grid.Col>
            ))}
        </Grid>
    );
}
