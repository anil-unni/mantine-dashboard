import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Group,
    Button,
    Text,
    Badge,
    ActionIcon,
    Menu,
    TextInput,
    Select,
    Stack,
    Image,
    Tooltip,
} from '@mantine/core';
import {
    IconPlus,
    IconDots,
    IconEdit,
    IconTrash,
    IconEye,
    IconSearch,
    IconRefresh,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { ListLayout } from '@/components/layouts';
import { useNewsList, useDeleteNews, useUpdateNewsStatus } from '@/hooks/api/news';
import { paths } from '@/routes/paths';
import type { News, NewsFilterParams } from '@/api/entities/news';
import { app } from '@/config';

export default function NewsListPage() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<NewsFilterParams>({
        page: 1,
        limit: 10,
        search: '',
        status: undefined,
        category: '',
        featured: undefined,
        breaking_news: undefined,
        sortBy: 'createdAt',
        sortOrder: -1,
    });

    const { data: news, isLoading, refetch, error } = useNewsList(filters);

    const deleteNewsMutation = useDeleteNews();
    const updateStatusMutation = useUpdateNewsStatus();

    const handleSearch = (value: string) => {
        setFilters((prev: NewsFilterParams) => ({ ...prev, search: value, page: 1 }));
    };

    const handleStatusFilter = (value: string | null) => {
        setFilters((prev: NewsFilterParams) => ({
            ...prev,
            status: value === 'active' ? true : value === 'inactive' ? false : undefined,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters((prev: NewsFilterParams) => ({ ...prev, page }));
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this news?')) {
            await deleteNewsMutation.mutateAsync(id);
        }
    };

    const handleStatusToggle = async (id: string, isActive: boolean) => {
        await updateStatusMutation.mutateAsync({ id, data: { isActive } });
    };

    const columns = [
        {
            accessor: 'thumbnail',
            title: 'Image',
            render: (news: News) => (
                <Image
                    src={news.thumbnail ? `${app.apiBaseUrl}/${news.thumbnail}` : undefined}
                    alt={news.thumbnail_alt}
                    width={60}
                    height={40}
                    radius="sm"
                    fit="cover"
                    fallbackSrc="https://placehold.co/60x40"
                />
            ),
        },
        {
            accessor: 'title',
            title: 'Title',
            render: (news: News) => (
                <div>
                    <Text fw={500} lineClamp={2}>
                        {news.title}
                    </Text>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                        {news.description}
                    </Text>
                </div>
            ),
        },
        {
            accessor: 'category',
            title: 'Category',
            render: (news: News) => (
                <Badge variant="light" color="blue">
                    {news.category}
                </Badge>
            ),
        },
        {
            accessor: 'author',
            title: 'Author',
        },
        {
            accessor: 'publish_date',
            title: 'Published',
            render: (news: News) => new Date(news.publish_date).toLocaleDateString(),
        },
        {
            accessor: 'status',
            title: 'Status',
            render: (news: News) => (
                <Group gap="xs">
                    <Badge color={news.isActive ? 'green' : 'red'}>
                        {news.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {news.featured && <Badge color="yellow">Featured</Badge>}
                    {news.breaking_news && <Badge color="red">Breaking</Badge>}
                </Group>
            ),
        },
        {
            accessor: 'actions',
            title: 'Actions',
            render: (news: News) => (
                <Group gap="xs">
                    <Tooltip label="View">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => navigate(`${paths.dashboard.news.view}/${news._id}`)}
                        >
                            <IconEye size={16} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Edit">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => navigate(`${paths.dashboard.news.edit}/${news._id}`)}
                        >
                            <IconEdit size={16} />
                        </ActionIcon>
                    </Tooltip>
                    <Menu>
                        <Menu.Target>
                            <ActionIcon variant="subtle">
                                <IconDots size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => handleStatusToggle(news._id, !news.isActive)}
                                color={news.isActive ? 'red' : 'green'}
                            >
                                {news.isActive ? 'Deactivate' : 'Activate'}
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => handleDelete(news._id)}
                                color="red"
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            ),
        },
    ];

    const filtersComponent = (
        <Stack gap="md">
            <Group>
                <TextInput
                    placeholder="Search news..."
                    leftSection={<IconSearch size={16} />}
                    value={filters.search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                <Button
                    variant="light"
                    leftSection={<IconRefresh size={16} />}
                    onClick={() => refetch()}
                >
                    Refresh
                </Button>
            </Group>

            <Group>
                <Select
                    placeholder="Status"
                    data={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                    ]}
                    value={filters.status === true ? 'active' : filters.status === false ? 'inactive' : null}
                    onChange={handleStatusFilter}
                    clearable
                />
            </Group>
        </Stack>
    );

    return (
        <ListLayout
            title="News & Updates"
            description="Manage your news articles and updates"
            rightSection={
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={() => navigate(paths.dashboard.news.create)}
                >
                    Create News
                </Button>
            }
            filters={filtersComponent}
        >
            <DataTable
                records={news || []}
                columns={columns}
                fetching={isLoading}
                totalRecords={news?.length || 0}
                recordsPerPage={filters.limit || 10}
                page={filters.page || 1}
                onPageChange={handlePageChange}
                noRecordsText="No news found"
                minHeight={200}
            />
        </ListLayout>
    );
}
