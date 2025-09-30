import React from 'react';
import { TextInput, Group, Button, ActionIcon } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

interface DataTableSearchProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (query: string) => void;
    onClear?: () => void;
    placeholder?: string;
    loading?: boolean;
}

export function DataTableSearch({
    value,
    onChange,
    onSearch,
    onClear,
    placeholder = 'Search...',
    loading = false,
}: DataTableSearchProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        onChange('');
        onClear?.();
    };

    return (
        <Group gap="xs">
            <TextInput
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                leftSection={<IconSearch size={16} />}
                rightSection={
                    value && (
                        <ActionIcon
                            variant="subtle"
                            size="sm"
                            onClick={handleClear}
                        >
                            <IconX size={14} />
                        </ActionIcon>
                    )
                }
                style={{ minWidth: 300 }}
                loading={loading}
            />
            {onSearch && (
                <Button onClick={() => onSearch(value)} loading={loading}>
                    Search
                </Button>
            )}
        </Group>
    );
}