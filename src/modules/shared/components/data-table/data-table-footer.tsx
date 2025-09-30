import React from 'react';
import { Table, Group, Text, Select, Pagination } from '@mantine/core';
import { PaginationState } from '../../types';
import { TABLE_PAGE_SIZES } from '../../constants';

interface DataTableFooterProps {
    pagination?: PaginationState;
    onPaginationChange?: (pagination: PaginationState) => void;
    totalItems?: number;
}

export function DataTableFooter({
    pagination,
    onPaginationChange,
    totalItems = 0,
}: DataTableFooterProps) {
    if (!pagination || !onPaginationChange) return null;

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
            page: 1,
            pageSize: parseInt(newPageSize),
        });
    };

    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);

    return (
        <Table.Tfoot>
            <Table.Tr>
                <Table.Td colSpan={100}>
                    <Group justify="space-between">
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
                </Table.Td>
            </Table.Tr>
        </Table.Tfoot>
    );
}
