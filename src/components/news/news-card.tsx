import React from 'react';
import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    Stack,
    Anchor,
    Box,
    ActionIcon,
    Tooltip,
} from '@mantine/core';
import { IconExternalLink, IconCalendar, IconUser, IconTag } from '@tabler/icons-react';
import type { News } from '@/api/entities/news';
import { app } from '@/config';

interface NewsCardProps {
    news: News;
    showActions?: boolean;
    onEdit?: (news: News) => void;
    onDelete?: (news: News) => void;
    onView?: (news: News) => void;
    compact?: boolean;
}

export function NewsCard({
    news,
    showActions = false,
    onEdit,
    onDelete,
    onView,
    compact = false
}: NewsCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={news.banner_image || news.thumbnail ? `${app.apiBaseUrl}/${news.banner_image || news.thumbnail}` : undefined}
                    alt={news.banner_image_alt || news.thumbnail_alt}
                    height={compact ? 160 : 200}
                    fallbackSrc="https://placehold.co/400x200"
                />
            </Card.Section>

            <Stack gap="sm" mt="md">
                <Group justify="space-between" align="flex-start">
                    <Text fw={500} lineClamp={2} style={{ flex: 1 }}>
                        {news.title}
                    </Text>
                    {showActions && (
                        <Group gap="xs">
                            {onView && (
                                <Tooltip label="View">
                                    <ActionIcon variant="subtle" onClick={() => onView(news)}>
                                        <IconExternalLink size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {onEdit && (
                                <Tooltip label="Edit">
                                    <ActionIcon variant="subtle" onClick={() => onEdit(news)}>
                                        <IconExternalLink size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </Group>
                    )}
                </Group>

                {!compact && (
                    <Text size="sm" c="dimmed" lineClamp={3}>
                        {news.description}
                    </Text>
                )}

                <Group gap="xs" wrap="wrap">
                    <Badge color={news.isActive ? 'green' : 'red'} size="sm">
                        {news.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {news.featured && <Badge color="yellow" size="sm">Featured</Badge>}
                    {news.breaking_news && <Badge color="red" size="sm">Breaking</Badge>}
                    {news.category && <Badge color="blue" size="sm">{news.category}</Badge>}
                </Group>

                <Group gap="md" c="dimmed">
                    {news.author && (
                        <Group gap="xs">
                            <IconUser size={14} />
                            <Text size="xs">{news.author}</Text>
                        </Group>
                    )}
                    <Group gap="xs">
                        <IconCalendar size={14} />
                        <Text size="xs">{new Date(news.publish_date).toLocaleDateString()}</Text>
                    </Group>
                </Group>

                {news.tags && news.tags.length > 0 && (
                    <Group gap="xs" wrap="wrap">
                        {news.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="light" color="gray" size="xs">
                                {tag}
                            </Badge>
                        ))}
                        {news.tags.length > 3 && (
                            <Text size="xs" c="dimmed">
                                +{news.tags.length - 3} more
                            </Text>
                        )}
                    </Group>
                )}

                {news.sources && news.sources.length > 0 && (
                    <Box>
                        <Text size="xs" fw={500} mb="xs">Sources:</Text>
                        <Group gap="xs" wrap="wrap">
                            {news.sources.slice(0, 2).map((source, index) => (
                                <Anchor
                                    key={index}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="xs"
                                >
                                    {source.name}
                                </Anchor>
                            ))}
                            {news.sources.length > 2 && (
                                <Text size="xs" c="dimmed">
                                    +{news.sources.length - 2} more
                                </Text>
                            )}
                        </Group>
                    </Box>
                )}
            </Stack>
        </Card>
    );
}
