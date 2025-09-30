import React from 'react';
import { Table } from '@mantine/core';
import { TableColumn } from '../../types';
import { DataTableRow } from './data-table-row';

interface DataTableBodyProps<T = any> {
    data: T[];
    columns: TableColumn<T>[];
    selectable?: boolean;
    selectedRows?: T[];
    onRowSelect?: (record: T, checked: boolean) => void;
    onRowClick?: (record: T) => void;
    loading?: boolean;
    emptyState?: React.ReactNode;
}

export function DataTableBody<T = any>({
    data,
    columns,
    selectable = false,
    selectedRows = [],
    onRowSelect,
    onRowClick,
    loading = false,
    emptyState,
}: DataTableBodyProps<T>) {
    if (loading) {
        return (
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td colSpan={columns.length + (selectable ? 1 : 0)}>
                        Loading...
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        );
    }

    if (data.length === 0) {
        return (
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td colSpan={columns.length + (selectable ? 1 : 0)}>
                        {emptyState || 'No data available'}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        );
    }

    return (
        <Table.Tbody>
            {data.map((record, index) => (
                <DataTableRow
                    key={index}
                    record={record}
                    columns={columns}
                    selectable={selectable}
                    selected={selectedRows.includes(record)}
                    onSelect={onRowSelect}
                    onClick={onRowClick}
                />
            ))}
        </Table.Tbody>
    );
}
