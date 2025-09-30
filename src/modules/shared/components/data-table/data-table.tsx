import React, { useState, useMemo } from 'react';
import {
    Table,
    ScrollArea,
    Box,
    Text,
    Group,
    ActionIcon,
    Checkbox,
    Stack,
    Pagination,
    TextInput,
    Select,
    Button,
    Flex,
    Badge,
    Tooltip,
    LoadingOverlay,
    Alert,
} from '@mantine/core';
import {
    IconSearch,
    IconFilter,
    IconDownload,
    IconRefresh,
    IconChevronDown,
    IconChevronUp,
    IconSelector,
} from '@tabler/icons-react';
import { DataTableProps, TableColumn, SortOption, PaginationState, SearchState } from '../../types';
import { useDataTable } from './use-data-table';
import { DataTableFilters } from './data-table-filters';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSearch } from './data-table-search';
import { DataTableActions } from './data-table-actions';
import { DataTableEmpty } from './data-table-empty';
import { DataTableLoading } from './data-table-loading';
import { DataTableError } from './data-table-error';

export function DataTable<T = any>({
    data,
    columns,
    loading = false,
    pagination,
    search,
    onSearchChange,
    onPaginationChange,
    onRowClick,
    onRowSelect,
    selectable = false,
    sortable = true,
    filterable = true,
    exportable = false,
    actions = [],
    className,
    style,
    ...props
}: DataTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortState, setSortState] = useState<SortOption[]>([]);

    const {
        filteredData,
        sortedData,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        handleSort,
        handleSearch,
        handleFilterChange,
        handleExport,
        handleRefresh,
    } = useDataTable({
        data,
        columns,
        search,
        onSearchChange,
    });

    const handleRowSelect = (row: T, checked: boolean) => {
        if (checked) {
            setSelectedRows(prev => [...prev, row]);
        } else {
            setSelectedRows(prev => prev.filter(item => item !== row));
        }
        onRowSelect?.(selectedRows);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows([...sortedData]);
        } else {
            setSelectedRows([]);
        }
        onRowSelect?.(selectedRows);
    };

    const handleRowClickInternal = (row: T) => {
        onRowClick?.(row);
    };

    const getSortIcon = (columnKey: string) => {
        const sort = sortState.find(s => s.key === columnKey);
        if (!sort) return <IconSelector size={16} />;
        return sort.direction === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />;
    };

    const renderCell = (column: TableColumn<T>, record: T) => {
        if (column.render) {
            return column.render(record[column.key], record);
        }

        const value = record[column.key];

        if (value === null || value === undefined) {
            return <Text c="dimmed">-</Text>;
        }

        if (typeof value === 'boolean') {
            return <Badge color={value ? 'green' : 'red'}>{value ? 'Yes' : 'No'}</Badge>;
        }

        if (typeof value === 'string' && value.length > 50) {
            return (
                <Tooltip label={value}>
                    <Text truncate>{value}</Text>
                </Tooltip>
            );
        }

        return <Text>{String(value)}</Text>;
    };

    const tableActions = [
        ...actions,
        ...(exportable ? [{
            label: 'Export',
            action: handleExport,
            icon: 'IconDownload',
            variant: 'outline' as const,
        }] : []),
        {
            label: 'Refresh',
            action: handleRefresh,
            icon: 'IconRefresh',
            variant: 'outline' as const,
        },
    ];

    if (loading) {
        return <DataTableLoading />;
    }

    if (data.length === 0) {
        return <DataTableEmpty />;
    }

    return (
        <Box className={className} style={style}>
            {/* Header with search and filters */}
            <Stack gap="md" mb="md">
                <Group justify="space-between">
                    <Group>
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftSection={<IconSearch size={16} />}
                            style={{ minWidth: 300 }}
                        />
                        {filterable && (
                            <Button
                                variant="outline"
                                leftSection={<IconFilter size={16} />}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Filters
                            </Button>
                        )}
                    </Group>

                    <Group>
                        <DataTableActions actions={tableActions} />
                    </Group>
                </Group>

                {/* Filters Panel */}
                {filterable && showFilters && (
                    <DataTableFilters
                        columns={columns}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClose={() => setShowFilters(false)}
                    />
                )}
            </Stack>

            {/* Table */}
            <ScrollArea>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            {selectable && (
                                <Table.Th style={{ width: 40 }}>
                                    <Checkbox
                                        checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < sortedData.length}
                                        onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                                    />
                                </Table.Th>
                            )}
                            {columns.map((column) => (
                                <Table.Th
                                    key={String(column.key)}
                                    style={{ width: column.width }}
                                    onClick={sortable ? () => handleSort(column.key as string) : undefined}
                                >
                                    <Group gap="xs" style={{ cursor: sortable ? 'pointer' : 'default' }}>
                                        <Text fw={500}>{column.title}</Text>
                                        {sortable && getSortIcon(column.key as string)}
                                    </Group>
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {sortedData.map((record, index) => (
                            <Table.Tr
                                key={index}
                                onClick={() => handleRowClickInternal(record)}
                                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {selectable && (
                                    <Table.Td>
                                        <Checkbox
                                            checked={selectedRows.includes(record)}
                                            onChange={(e) => handleRowSelect(record, e.currentTarget.checked)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </Table.Td>
                                )}
                                {columns.map((column) => (
                                    <Table.Td key={String(column.key)}>
                                        {renderCell(column, record)}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            {/* Pagination */}
            {pagination && (
                <DataTablePagination
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                />
            )}

            {/* Selected rows info */}
            {selectable && selectedRows.length > 0 && (
                <Box mt="md">
                    <Text size="sm" c="dimmed">
                        {selectedRows.length} row(s) selected
                    </Text>
                </Box>
            )}
        </Box>
    );
}
