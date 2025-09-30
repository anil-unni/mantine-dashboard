import React from 'react';
import { Box, Skeleton, Stack } from '@mantine/core';

interface DataTableLoadingProps {
    rows?: number;
    columns?: number;
}

export function DataTableLoading({ rows = 5, columns = 4 }: DataTableLoadingProps) {
    return (
        <Box>
            <Stack gap="xs" mb="md">
                <Skeleton height={40} />
                <Skeleton height={40} />
            </Stack>

            <Stack gap="xs">
                {Array.from({ length: rows }).map((_, index) => (
                    <Skeleton key={index} height={50} />
                ))}
            </Stack>
        </Box>
    );
}
