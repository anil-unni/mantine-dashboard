import React from 'react';
import { Table, Checkbox } from '@mantine/core';
import { TableColumn } from '../../types';
import { DataTableColumn } from './data-table-column';

interface DataTableRowProps<T = any> {
    record: T;
    columns: TableColumn<T>[];
    selectable?: boolean;
    selected?: boolean;
    onSelect?: (record: T, checked: boolean) => void;
    onClick?: (record: T) => void;
}

export function DataTableRow<T = any>({
    record,
    columns,
    selectable = false,
    selected = false,
    onSelect,
    onClick,
}: DataTableRowProps<T>) {
    const handleSelect = (checked: boolean) => {
        onSelect?.(record, checked);
    };

    const handleClick = () => {
        onClick?.(record);
    };

    return (
        <Table.Tr
            onClick={handleClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            {selectable && (
                <Table.Td>
                    <Checkbox
                        checked={selected}
                        onChange={(e) => handleSelect(e.currentTarget.checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </Table.Td>
            )}
            {columns.map((column) => (
                <Table.Td key={String(column.key)}>
                    <DataTableColumn column={column} record={record} />
                </Table.Td>
            ))}
        </Table.Tr>
    );
}
