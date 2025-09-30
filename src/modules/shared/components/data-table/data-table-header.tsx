import React from 'react';
import { Table, Group, Text, ActionIcon } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import { TableColumn, SortOption } from '../../types';

interface DataTableHeaderProps<T = any> {
    columns: TableColumn<T>[];
    sortable?: boolean;
    sortState?: SortOption[];
    onSort?: (key: string) => void;
    selectable?: boolean;
    selectedAll?: boolean;
    indeterminate?: boolean;
    onSelectAll?: (checked: boolean) => void;
}

export function DataTableHeader<T = any>({
    columns,
    sortable = true,
    sortState = [],
    onSort,
    selectable = false,
    selectedAll = false,
    indeterminate = false,
    onSelectAll,
}: DataTableHeaderProps<T>) {
    const getSortIcon = (columnKey: string) => {
        const sort = sortState.find(s => s.key === columnKey);
        if (!sort) return <IconSelector size={16} />;
        return sort.direction === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />;
    };

    const handleSort = (columnKey: string) => {
        if (sortable && onSort) {
            onSort(columnKey);
        }
    };

    return (
        <Table.Thead>
            <Table.Tr>
                {selectable && (
                    <Table.Th style={{ width: 40 }}>
                        <Checkbox
                            checked={selectedAll}
                            indeterminate={indeterminate}
                            onChange={(e) => onSelectAll?.(e.currentTarget.checked)}
                        />
                    </Table.Th>
                )}
                {columns.map((column) => (
                    <Table.Th
                        key={String(column.key)}
                        style={{ width: column.width }}
                        onClick={() => handleSort(column.key as string)}
                    >
                        <Group gap="xs" style={{ cursor: sortable ? 'pointer' : 'default' }}>
                            <Text fw={500}>{column.title}</Text>
                            {sortable && getSortIcon(column.key as string)}
                        </Group>
                    </Table.Th>
                ))}
            </Table.Tr>
        </Table.Thead>
    );
}
