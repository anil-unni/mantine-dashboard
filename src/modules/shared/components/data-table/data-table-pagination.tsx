import React from 'react';
import {
    Group,
    Text,
    Select,
    Pagination,
    Stack,
} from '@mantine/core';
import { PaginationState } from '../../types';
import { TABLE_PAGE_SIZES, DEFAULT_PAGE_SIZE } from '../../constants';

interface DataTablePaginationProps {
    pagination: PaginationState;
    onPaginationChange: (pagination: PaginationState) => void;
}

export function DataTablePagination({
    pagination,
    onPaginationChange,
}: DataTablePaginationProps) {
    const { page, pageSize, total } = pagination;
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newPage: number) => {
        onPaginationChange({
            ...pagination,
            page: newPage,
        });
    };

    const handlePageSizeChange = (newPageSize: string) => {
        onPaginationChange({
            ...pagination,
            page: 1, // Reset to first page when changing page size
            pageSize: parseInt(newPageSize),
        });
    };

    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);

    return (
        <Group justify="space-between" mt="md">
            <Group>
                <Text size="sm" c="dimmed">
                    Showing {startItem} to {endItem} of {total} entries
                </Text>
                <Select
                    value={pageSize.toString()}
                    onChange={handlePageSizeChange}
                    data={TABLE_PAGE_SIZES.map(size => ({
                        value: size.toString(),
                        label: `${size} per page`,
                    }))}
                    size="sm"
                    style={{ width: 120 }}
                />
            </Group>

            {totalPages > 1 && (
                <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={totalPages}
                    size="sm"
                />
            )}
        </Group>
    );
}
