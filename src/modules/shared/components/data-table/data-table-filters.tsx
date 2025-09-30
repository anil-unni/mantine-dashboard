import React from 'react';
import {
    Box,
    Group,
    Button,
    TextInput,
    Select,
    MultiSelect,
    NumberInput,
    Switch,
    Stack,
    Text,
    ActionIcon,
    Collapse,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconX, IconFilter } from '@tabler/icons-react';
import { TableColumn, FilterOption } from '../../types';

interface DataTableFiltersProps<T = any> {
    columns: TableColumn<T>[];
    filters: Record<string, any>;
    onFilterChange: (key: string, value: any) => void;
    onClose: () => void;
}

export function DataTableFilters<T = any>({
    columns,
    filters,
    onFilterChange,
    onClose,
}: DataTableFiltersProps<T>) {
    const filterableColumns = columns.filter(col => col.filterable !== false);

    const renderFilterField = (column: TableColumn<T>) => {
        const key = String(column.key);
        const value = filters[key];

        switch (column.type) {
            case 'select':
                return (
                    <Select
                        key={key}
                        label={column.title}
                        placeholder={`Filter by ${column.title}`}
                        value={value || ''}
                        onChange={(val) => onFilterChange(key, val)}
                        data={column.options || []}
                        clearable
                        searchable
                    />
                );

            case 'multiselect':
                return (
                    <MultiSelect
                        key={key}
                        label={column.title}
                        placeholder={`Filter by ${column.title}`}
                        value={value || []}
                        onChange={(val) => onFilterChange(key, val)}
                        data={column.options || []}
                        clearable
                        searchable
                    />
                );

            case 'date':
                return (
                    <DateInput
                        key={key}
                        label={column.title}
                        placeholder={`Filter by ${column.title}`}
                        value={value ? new Date(value) : null}
                        onChange={(val) => {
                            if (val) {
                                const dateValue = typeof val === 'string' ? val : (val as Date).toISOString();
                                onFilterChange(key, dateValue);
                            } else {
                                onFilterChange(key, null);
                            }
                        }}
                        clearable
                    />
                );

            case 'number':
                return (
                    <NumberInput
                        key={key}
                        label={column.title}
                        placeholder={`Filter by ${column.title}`}
                        value={value || ''}
                        onChange={(val) => onFilterChange(key, val)}
                    />
                );

            case 'switch':
                return (
                    <Switch
                        key={key}
                        label={column.title}
                        checked={value || false}
                        onChange={(e) => onFilterChange(key, e.currentTarget.checked)}
                    />
                );

            default:
                return (
                    <TextInput
                        key={key}
                        label={column.title}
                        placeholder={`Filter by ${column.title}`}
                        value={value || ''}
                        onChange={(e) => onFilterChange(key, e.target.value)}
                    />
                );
        }
    };

    const handleClearAll = () => {
        filterableColumns.forEach(col => {
            onFilterChange(String(col.key), undefined);
        });
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value !== undefined && value !== null && value !== '' &&
        (Array.isArray(value) ? value.length > 0 : true)
    );

    return (
        <Box>
            <Group justify="space-between" mb="md">
                <Group>
                    <IconFilter size={16} />
                    <Text fw={500}>Filters</Text>
                    {hasActiveFilters && (
                        <Text size="sm" c="dimmed">
                            ({Object.values(filters).filter(v => v !== undefined && v !== null && v !== '').length} active)
                        </Text>
                    )}
                </Group>
                <Group>
                    {hasActiveFilters && (
                        <Button variant="subtle" size="xs" onClick={handleClearAll}>
                            Clear All
                        </Button>
                    )}
                    <ActionIcon variant="subtle" onClick={onClose}>
                        <IconX size={16} />
                    </ActionIcon>
                </Group>
            </Group>

            <Stack gap="md">
                {filterableColumns.map(renderFilterField)}
            </Stack>
        </Box>
    );
}
