import { useState, useMemo, useCallback } from 'react';
import { TableColumn, SortOption, SearchState, PaginationState } from '../../types';
import { formatFileSize } from '../../utils';

interface UseDataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  search?: SearchState;
  onSearchChange?: (search: SearchState) => void;
}

export function useDataTable<T = any>({
  data,
  columns,
  search,
  onSearchChange,
}: UseDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState(search?.query || '');
  const [filters, setFilters] = useState<Record<string, any>>(search?.filters || {});
  const [sortState, setSortState] = useState<SortOption[]>(search?.sort || []);

  // Filter data based on search query and filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(record => {
        return columns.some(column => {
          const value = record[column.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        filtered = filtered.filter(record => {
          const recordValue = (record as any)[key];
          if (recordValue === null || recordValue === undefined) return false;
          
          if (Array.isArray(value)) {
            return value.includes(recordValue);
          }
          
          if (typeof value === 'string') {
            return String(recordValue).toLowerCase().includes(value.toLowerCase());
          }
          
          return recordValue === value;
        });
      }
    });

    return filtered;
  }, [data, searchQuery, filters, columns]);

  // Sort data based on sort state
  const sortedData = useMemo(() => {
    if (sortState.length === 0) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (const sort of sortState) {
        const aValue = (a as any)[sort.key];
        const bValue = (b as any)[sort.key];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        else if (aValue > bValue) comparison = 1;
        
        if (comparison !== 0) {
          return sort.direction === 'desc' ? -comparison : comparison;
        }
      }
      return 0;
    });
  }, [filteredData, sortState]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearchChange?.({
      query,
      filters,
      sort: sortState,
    });
  }, [filters, sortState, onSearchChange]);

  // Handle filter change
  const handleFilterChange = useCallback((key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearchChange?.({
      query: searchQuery,
      filters: newFilters,
      sort: sortState,
    });
  }, [filters, searchQuery, sortState, onSearchChange]);

  // Handle sort
  const handleSort = useCallback((key: string) => {
    setSortState(prev => {
      const existingSort = prev.find(s => s.key === key);
      let newSort: SortOption[];

      if (existingSort) {
        if (existingSort.direction === 'asc') {
          newSort = prev.map(s => s.key === key ? { ...s, direction: 'desc' } : s);
        } else {
          newSort = prev.filter(s => s.key !== key);
        }
      } else {
        newSort = [...prev, { key, direction: 'asc' }];
      }

      onSearchChange?.({
        query: searchQuery,
        filters,
        sort: newSort,
      });

      return newSort;
    });
  }, [searchQuery, filters, onSearchChange]);

  // Handle export
  const handleExport = useCallback((format: 'csv' | 'xlsx' | 'pdf' = 'csv') => {
    const headers = columns.map(col => col.title);
    const rows = sortedData.map(record => 
      columns.map(col => {
        const value = record[col.key];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
      })
    );

    if (format === 'csv') {
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `data-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }, [columns, sortedData]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setSearchQuery('');
    setFilters({});
    setSortState([]);
    onSearchChange?.({
      query: '',
      filters: {},
      sort: [],
    });
  }, [onSearchChange]);

  return {
    filteredData,
    sortedData,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortState,
    setSortState,
    handleSort,
    handleSearch,
    handleFilterChange,
    handleExport,
    handleRefresh,
  };
}
