import { useState } from 'react';
import {
    Container,
    Title,
    Group,
    Button,
    Card,
    Text,
    Badge,
    ActionIcon,
    Menu,
    Stack,
    Select,
    TextInput,
    Grid,
    Pagination,
    Modal,
    Textarea,
    Switch,
    NumberInput,
    MultiSelect,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconDots, IconEdit, IconTrash, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useGetNewsArticles, useCreateNewsArticle, useUpdateNewsArticle, useDeleteNewsArticle, usePublishNewsArticle, useUnpublishNewsArticle } from '@/hooks/api';
import { usePagination } from '@/api/helpers';
import { NewsArticle, CreateNewsArticle, UpdateNewsArticle, NewsCategory } from '@/api/entities';
import { notifications } from '@mantine/notifications';
import React from 'react';

const NEWS_CATEGORIES = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
];

export default function NewsManagementPage() {
    const [opened, { open, close }] = useDisclosure(false);
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [category, setCategory] = useState<string>('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<string>('publishedAt:desc');

    const pagination = usePagination();
    const { page, limit, setPage, setLimit } = pagination;

    const { data: newsData, isLoading } = useGetNewsArticles({
        query: {
            page,
            limit,
            category: category || undefined,
            search: search || undefined,
            sort: sort || undefined,
        },
    });

    const createMutation = useCreateNewsArticle();
    const updateMutation = useUpdateNewsArticle();
    const deleteMutation = useDeleteNewsArticle();
    const publishMutation = usePublishNewsArticle();
    const unpublishMutation = useUnpublishNewsArticle();

    const handleSubmit = (values: CreateNewsArticle | UpdateNewsArticle) => {
        if (editingArticle) {
            updateMutation({ route: { id: editingArticle.id } }).mutate({
                variables: values as UpdateNewsArticle,
            }, {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Article updated successfully',
                        color: 'green',
                    });
                    close();
                    setEditingArticle(null);
                },
                onError: (error) => {
                    notifications.show({
                        title: 'Error',
                        message: 'Failed to update article',
                        color: 'red',
                    });
                },
            });
        } else {
            createMutation().mutate({
                variables: values as CreateNewsArticle,
            }, {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Article created successfully',
                        color: 'green',
                    });
                    close();
                },
                onError: (error) => {
                    notifications.show({
                        title: 'Error',
                        message: 'Failed to create article',
                        color: 'red',
                    });
                },
            });
        }
    };

    const handleDelete = (article: NewsArticle) => {
        deleteMutation({ route: { id: article.id } }).mutate({
            model: article,
        }, {
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Article deleted successfully',
                    color: 'green',
                });
            },
            onError: (error) => {
                notifications.show({
                    title: 'Error',
                    message: 'Failed to delete article',
                    color: 'red',
                });
            },
        });
    };

    const handlePublish = (article: NewsArticle) => {
        if (article.isPublished) {
            unpublishMutation({ route: { id: article.id } }).mutate({
                variables: undefined,
            }, {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Article unpublished successfully',
                        color: 'green',
                    });
                },
            });
        } else {
            publishMutation({ route: { id: article.id } }).mutate({
                variables: undefined,
            }, {
                onSuccess: () => {
                    notifications.show({
                        title: 'Success',
                        message: 'Article published successfully',
                        color: 'green',
                    });
                },
            });
        }
    };

    const openEditModal = (article: NewsArticle) => {
        setEditingArticle(article);
        open();
    };

    const openCreateModal = () => {
        setEditingArticle(null);
        open();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Container size="xl">
            <Group justify="space-between" mb="lg">
                <Title order={2}>News Management</Title>
                <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal}>
                    Add Article
                </Button>
            </Group>

            {/* Filters */}
            <Card mb="lg">
                <Grid>
                    <Grid.Col span={4}>
                        <TextInput
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            placeholder="Category"
                            data={NEWS_CATEGORIES}
                            value={category}
                            onChange={setCategory}
                            clearable
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            placeholder="Sort by"
                            data={[
                                { value: 'publishedAt:desc', label: 'Newest First' },
                                { value: 'publishedAt:asc', label: 'Oldest First' },
                                { value: 'title:asc', label: 'Title A-Z' },
                                { value: 'views:desc', label: 'Most Viewed' },
                            ]}
                            value={sort}
                            onChange={setSort}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Select
                            placeholder="Per page"
                            data={[
                                { value: '10', label: '10' },
                                { value: '25', label: '25' },
                                { value: '50', label: '50' },
                            ]}
                            value={limit.toString()}
                            onChange={(value) => setLimit(Number(value))}
                        />
                    </Grid.Col>
                </Grid>
            </Card>

            {/* News Articles */}
            <Stack gap="md">
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    newsData?.data.map((article) => (
                        <Card key={article.id} shadow="sm" padding="lg">
                            <Group justify="space-between" align="flex-start">
                                <div style={{ flex: 1 }}>
                                    <Group gap="xs" mb="xs">
                                        <Badge color={article.isPublished ? 'green' : 'gray'}>
                                            {article.isPublished ? 'Published' : 'Draft'}
                                        </Badge>
                                        <Badge variant="outline">{article.category}</Badge>
                                        <Text size="sm" c="dimmed">
                                            {formatDate(article.publishedAt)}
                                        </Text>
                                    </Group>
                                    <Title order={4} mb="xs">
                                        {article.title}
                                    </Title>
                                    <Text c="dimmed" mb="xs">
                                        {article.excerpt}
                                    </Text>
                                    <Group gap="xs">
                                        <Text size="sm">By {article.author}</Text>
                                        <Text size="sm">•</Text>
                                        <Text size="sm">{article.readTime} min read</Text>
                                        <Text size="sm">•</Text>
                                        <Text size="sm">{article.views} views</Text>
                                    </Group>
                                </div>
                                <Menu>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle">
                                            <IconDots size={16} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            leftSection={<IconEdit size={16} />}
                                            onClick={() => openEditModal(article)}
                                        >
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={article.isPublished ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                                            onClick={() => handlePublish(article)}
                                        >
                                            {article.isPublished ? 'Unpublish' : 'Publish'}
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={<IconTrash size={16} />}
                                            color="red"
                                            onClick={() => handleDelete(article)}
                                        >
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Card>
                    ))
                )}
            </Stack>

            {/* Pagination */}
            {newsData?.meta && (
                <Group justify="center" mt="xl">
                    <Pagination
                        total={newsData.meta.lastPage}
                        value={page}
                        onChange={setPage}
                        size="sm"
                    />
                </Group>
            )}

            {/* Create/Edit Modal */}
            <NewsArticleModal
                opened={opened}
                onClose={close}
                onSubmit={handleSubmit}
                article={editingArticle}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
        </Container>
    );
}

interface NewsArticleModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (values: CreateNewsArticle | UpdateNewsArticle) => void;
    article: NewsArticle | null;
    isLoading: boolean;
}

function NewsArticleModal({ opened, onClose, onSubmit, article, isLoading }: NewsArticleModalProps) {
    const [formData, setFormData] = useState<CreateNewsArticle>({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: 'technology',
        imageUrl: '',
        isPublished: false,
        tags: [],
        readTime: 5,
    });

    React.useEffect(() => {
        if (article) {
            setFormData({
                title: article.title,
                content: article.content,
                excerpt: article.excerpt,
                author: article.author,
                category: article.category,
                imageUrl: article.imageUrl || '',
                isPublished: article.isPublished,
                tags: article.tags,
                readTime: article.readTime,
            });
        } else {
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                author: '',
                category: 'technology',
                imageUrl: '',
                isPublished: false,
                tags: [],
                readTime: 5,
            });
        }
    }, [article]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={article ? 'Edit Article' : 'Create Article'}
            size="xl"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <TextInput
                        label="Title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Textarea
                        label="Excerpt"
                        required
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                    <Textarea
                        label="Content"
                        required
                        minRows={6}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                    <Group grow>
                        <TextInput
                            label="Author"
                            required
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        />
                        <Select
                            label="Category"
                            required
                            data={NEWS_CATEGORIES}
                            value={formData.category}
                            onChange={(value) => setFormData({ ...formData, category: value as NewsCategory })}
                        />
                    </Group>
                    <Group grow>
                        <TextInput
                            label="Image URL"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <NumberInput
                            label="Read Time (minutes)"
                            required
                            min={1}
                            value={formData.readTime}
                            onChange={(value) => setFormData({ ...formData, readTime: value || 5 })}
                        />
                    </Group>
                    <MultiSelect
                        label="Tags"
                        placeholder="Add tags"
                        data={formData.tags}
                        value={formData.tags}
                        onChange={(value) => setFormData({ ...formData, tags: value })}
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            return item;
                        }}
                    />
                    <Switch
                        label="Published"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    />
                    <Group justify="flex-end" gap="sm">
                        <Button variant="subtle" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={isLoading}>
                            {article ? 'Update' : 'Create'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
