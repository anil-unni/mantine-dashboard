import React from 'react';
import { TableColumn } from '../../types';

interface DataTableColumnProps<T = any> {
    column: TableColumn<T>;
    record: T;
}

export function DataTableColumn<T = any>({ column, record }: DataTableColumnProps<T>) {
    const value = record[column.key];

    if (column.render) {
        return <>{column.render(value, record)}</>;
    }

    if (value === null || value === undefined) {
        return <span>-</span>;
    }

    return <span>{String(value)}</span>;
}
