import { useState } from 'react';
import {
    Card,
    Title,
    Text,
    Group,
    Badge,
    Stack,
    Button,
    Modal,
    Image,
    Divider,
    ActionIcon,
    Menu,
    Grid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconDots, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useGetNewsArticles, usePublishNewsArticle, useUnpublishNewsArticle } from '@/hooks/api';
import { NewsArticle } from '@/api/entities';
import { notifications } from '@mantine/notifications';

export default function NewsWidget() {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const { data: newsData, isLoading } = useGetNewsArticles({
        query: {
            page: 1,
            limit: 5,
            sort: 'publishedAt:desc',
        },
    });

    const publishMutation = usePublishNewsArticle();
    const unpublishMutation = useUnpublishNewsArticle();

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

    const openArticleModal = (article: NewsArticle) => {
        setSelectedArticle(article);
        open();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatReadTime = (minutes: number) => {
        return `${minutes} min read`;
    };

    if (isLoading) {
        return (
            <Card>
                <Title order={3} mb="md">
                    Latest News
                </Title>
                <Text c="dimmed">Loading...</Text>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <Group justify="space-between" mb="md">
                    <Title order={3}>Latest News</Title>
                    <Button
                        variant="subtle"
                        size="sm"
                        leftSection={<IconPlus size={16} />}
                        component="a"
                        href="/dashboard/management/news"
                    >
                        View All
                    </Button>
                </Group>

                <Stack gap="md">
                    {newsData?.data.slice(0, 5).map((article) => (
                        <Card key={article.id} shadow="sm" padding="sm" withBorder>
                            <Group justify="space-between" align="flex-start">
                                <div style={{ flex: 1 }}>
                                    <Group gap="xs" mb="xs">
                                        <Badge color={article.isPublished ? 'green' : 'gray'} size="sm">
                                            {article.isPublished ? 'Published' : 'Draft'}
                                        </Badge>
                                        <Badge variant="outline" size="sm">
                                            {article.category}
                                        </Badge>
                                    </Group>
                                    <Title order={5} mb="xs" lineClamp={2}>
                                        {article.title}
                                    </Title>
                                    <Text c="dimmed" size="sm" lineClamp={2} mb="xs">
                                        {article.excerpt}
                                    </Text>
                                    <Group gap="xs">
                                        <Text size="xs" c="dimmed">
                                            By {article.author}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            •
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            {formatDate(article.publishedAt)}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            •
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            {formatReadTime(article.readTime)}
                                        </Text>
                                    </Group>
                                </div>
                                <Menu>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle" size="sm">
                                            <IconDots size={16} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            leftSection={<IconEye size={16} />}
                                            onClick={() => openArticleModal(article)}
                                        >
                                            View
                                        </Menu.Item>
                                        <Menu.Item
                                            leftSection={article.isPublished ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                                            onClick={() => handlePublish(article)}
                                        >
                                            {article.isPublished ? 'Unpublish' : 'Publish'}
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Card>
                    ))}
                </Stack>

                {(!newsData?.data || newsData.data.length === 0) && (
                    <Text c="dimmed" ta="center" py="xl">
                        No news articles found
                    </Text>
                )}
            </Card>

            {/* Article Detail Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title={selectedArticle?.title}
                size="lg"
            >
                {selectedArticle && (
                    <Stack gap="md">
                        {selectedArticle.imageUrl && (
                            <Image
                                src={selectedArticle.imageUrl}
                                alt={selectedArticle.title}
                                radius="md"
                            />
                        )}

                        <Group gap="xs">
                            <Badge color={selectedArticle.isPublished ? 'green' : 'gray'}>
                                {selectedArticle.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline">{selectedArticle.category}</Badge>
                            <Text size="sm" c="dimmed">
                                {formatDate(selectedArticle.publishedAt)}
                            </Text>
                        </Group>

                        <Text c="dimmed" size="sm">
                            {selectedArticle.excerpt}
                        </Text>

                        <Divider />

                        <div>
                            <Text size="sm" fw={500} mb="xs">
                                Content
                            </Text>
                            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                                {selectedArticle.content}
                            </Text>
                        </div>

                        <Divider />

                        <Group gap="xs">
                            <Text size="sm" fw={500}>
                                Author:
                            </Text>
                            <Text size="sm">{selectedArticle.author}</Text>
                        </Group>

                        <Group gap="xs">
                            <Text size="sm" fw={500}>
                                Read Time:
                            </Text>
                            <Text size="sm">{formatReadTime(selectedArticle.readTime)}</Text>
                        </Group>

                        <Group gap="xs">
                            <Text size="sm" fw={500}>
                                Views:
                            </Text>
                            <Text size="sm">{selectedArticle.views}</Text>
                        </Group>

                        {selectedArticle.tags.length > 0 && (
                            <Group gap="xs">
                                <Text size="sm" fw={500}>
                                    Tags:
                                </Text>
                                <Group gap="xs">
                                    {selectedArticle.tags.map((tag) => (
                                        <Badge key={tag} variant="light" size="sm">
                                            {tag}
                                        </Badge>
                                    ))}
                                </Group>
                            </Group>
                        )}
                    </Stack>
                )}
            </Modal>
        </>
    );
}
