import React from 'react';
import {
    Paper,
    Stack,
    Group,
    TextInput,
    Select,
    Button,
    Text,
    Badge,
    ActionIcon,
} from '@mantine/core';
import { IconSearch, IconRefresh, IconX } from '@tabler/icons-react';
import type { NewsFilterParams } from '@/api/entities/news';

interface NewsFiltersProps {
    filters: NewsFilterParams;
    onFiltersChange: (filters: NewsFilterParams) => void;
    onReset?: () => void;
    showSearch?: boolean;
    showStatus?: boolean;
    showCategory?: boolean;
    showFeatured?: boolean;
    showBreaking?: boolean;
    categories?: string[];
}

export function NewsFilters({
    filters,
    onFiltersChange,
    onReset,
    showSearch = true,
    showStatus = true,
    showCategory = true,
    showFeatured = true,
    showBreaking = true,
    categories = ['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Politics'],
}: NewsFiltersProps) {
    const handleSearch = (value: string) => {
        onFiltersChange({ ...filters, search: value, page: 1 });
    };

    const handleStatusFilter = (value: string | null) => {
        onFiltersChange({
            ...filters,
            status: value === 'active' ? true : value === 'inactive' ? false : undefined,
            page: 1,
        });
    };

    const handleCategoryFilter = (value: string | null) => {
        onFiltersChange({ ...filters, category: value || '', page: 1 });
    };

    const handleFeaturedFilter = (value: string | null) => {
        onFiltersChange({
            ...filters,
            featured: value === 'featured' ? true : value === 'not-featured' ? false : undefined,
            page: 1,
        });
    };

    const handleBreakingFilter = (value: string | null) => {
        onFiltersChange({
            ...filters,
            breaking_news: value === 'breaking' ? true : value === 'not-breaking' ? false : undefined,
            page: 1,
        });
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.search) count++;
        if (filters.status !== undefined) count++;
        if (filters.category) count++;
        if (filters.featured !== undefined) count++;
        if (filters.breaking_news !== undefined) count++;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <Paper p="md">
            <Stack gap="md">
                <Group justify="space-between">
                    <Text fw={500}>Filters</Text>
                    {activeFiltersCount > 0 && (
                        <Group gap="xs">
                            <Badge color="blue" size="sm">
                                {activeFiltersCount} active
                            </Badge>
                            {onReset && (
                                <ActionIcon
                                    variant="subtle"
                                    color="red"
                                    onClick={onReset}
                                    size="sm"
                                >
                                    <IconX size={14} />
                                </ActionIcon>
                            )}
                        </Group>
                    )}
                </Group>

                <Group>
                    {showSearch && (
                        <TextInput
                            placeholder="Search news..."
                            leftSection={<IconSearch size={16} />}
                            value={filters.search || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                            style={{ flex: 1 }}
                        />
                    )}
                    <Button
                        variant="light"
                        leftSection={<IconRefresh size={16} />}
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </Button>
                </Group>

                <Group wrap="wrap">
                    {showStatus && (
                        <Select
                            placeholder="Status"
                            data={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                            value={
                                filters.status === true
                                    ? 'active'
                                    : filters.status === false
                                        ? 'inactive'
                                        : null
                            }
                            onChange={handleStatusFilter}
                            clearable
                            style={{ minWidth: 120 }}
                        />
                    )}

                    {showCategory && (
                        <Select
                            placeholder="Category"
                            data={categories.map((cat) => ({ value: cat, label: cat }))}
                            value={filters.category || null}
                            onChange={handleCategoryFilter}
                            clearable
                            style={{ minWidth: 120 }}
                        />
                    )}

                    {showFeatured && (
                        <Select
                            placeholder="Featured"
                            data={[
                                { value: 'featured', label: 'Featured' },
                                { value: 'not-featured', label: 'Not Featured' },
                            ]}
                            value={
                                filters.featured === true
                                    ? 'featured'
                                    : filters.featured === false
                                        ? 'not-featured'
                                        : null
                            }
                            onChange={handleFeaturedFilter}
                            clearable
                            style={{ minWidth: 120 }}
                        />
                    )}

                    {showBreaking && (
                        <Select
                            placeholder="Breaking News"
                            data={[
                                { value: 'breaking', label: 'Breaking' },
                                { value: 'not-breaking', label: 'Not Breaking' },
                            ]}
                            value={
                                filters.breaking_news === true
                                    ? 'breaking'
                                    : filters.breaking_news === false
                                        ? 'not-breaking'
                                        : null
                            }
                            onChange={handleBreakingFilter}
                            clearable
                            style={{ minWidth: 120 }}
                        />
                    )}
                </Group>
            </Stack>
        </Paper>
    );
}
