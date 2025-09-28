import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Text,
  Group,
  Badge,
  Button,
  Image,
  Anchor,
  Grid,
  Card,
  SimpleGrid,
} from '@mantine/core';
import { IconArrowLeft, IconEdit, IconExternalLink, IconCalendar, IconUser, IconTag } from '@tabler/icons-react';
import { ViewLayout } from '@/components/layouts';
import { useNewsDetail } from '@/hooks/api/news';
import { paths } from '@/routes/paths';
import { app } from '@/config';

export default function ViewNewsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: news, isLoading } = useNewsDetail(id!);

  if (isLoading) {
    return (
      <ViewLayout
        title="View News"
        description="Loading news article details..."
        loading={true}
        loadingComponent={<div>Loading...</div>}
      >
        <div>Loading...</div>
      </ViewLayout>
    );
  }

  if (!news) {
    return (
      <ViewLayout
        title="View News"
        description="News not found"
      >
        <Text>News not found</Text>
      </ViewLayout>
    );
  }

  const sections = [
    {
      title: 'Article Details',
      children: (
        <>
          <Group justify="space-between" align="flex-start">
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 600 }}>{news.title}</h2>
              <Text c="dimmed" size="lg" mb="md">{news.description}</Text>

              <Group gap="md" mb="md">
                <Badge color={news.isActive ? 'green' : 'red'} size="lg">
                  {news.isActive ? 'Active' : 'Inactive'}
                </Badge>
                {news.featured && <Badge color="yellow" size="lg">Featured</Badge>}
                {news.breaking_news && <Badge color="red" size="lg">Breaking News</Badge>}
                <Badge color="blue" size="lg">{news.category}</Badge>
              </Group>

              <Group gap="xl" c="dimmed">
                <Group gap="xs">
                  <IconUser size={16} />
                  <Text size="sm">{news.author}</Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={16} />
                  <Text size="sm">{new Date(news.publish_date).toLocaleDateString()}</Text>
                </Group>
                <Group gap="xs">
                  <IconTag size={16} />
                  <Text size="sm">Priority: {news.priority}</Text>
                </Group>
              </Group>
            </div>
          </Group>
        </>
      ),
    },
    ...(news.banner_image || news.thumbnail ? [{
      title: 'Images',
      children: (
        <>
          <Grid>
            {news.banner_image && (
              <Grid.Col span={12}>
                <div>
                  <Text fw={500} mb="xs">Banner Image</Text>
                  <Image
                    src={news.banner_image ? `${app.apiBaseUrl}/${news.banner_image}` : undefined}
                    alt={news.banner_image_alt}
                    radius="md"
                    fallbackSrc="https://placehold.co/800x400"
                  />
                </div>
              </Grid.Col>
            )}
            {news.thumbnail && (
              <Grid.Col span={6}>
                <div>
                  <Text fw={500} mb="xs">Thumbnail</Text>
                  <Image
                    src={news.thumbnail ? `${app.apiBaseUrl}/${news.thumbnail}` : undefined}
                    alt={news.thumbnail_alt}
                    radius="md"
                    fallbackSrc="https://placehold.co/300x200"
                  />
                </div>
              </Grid.Col>
            )}
            {news.mobile_banner_image && (
              <Grid.Col span={6}>
                <div>
                  <Text fw={500} mb="xs">Mobile Banner</Text>
                  <Image
                    src={news.mobile_banner_image ? `${app.apiBaseUrl}/${news.mobile_banner_image}` : undefined}
                    alt={news.banner_image_alt}
                    radius="md"
                    fallbackSrc="https://placehold.co/300x200"
                  />
                </div>
              </Grid.Col>
            )}
          </Grid>

          {news.images && news.images.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <Text fw={500} mb="xs">Additional Images</Text>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
                {news.images.map((image: string, index: number) => (
                  <Image
                    key={index}
                    src={image ? `${app.apiBaseUrl}/${image}` : undefined}
                    alt={`Additional image ${index + 1}`}
                    radius="md"
                    fallbackSrc="https://placehold.co/200x150"
                  />
                ))}
              </SimpleGrid>
            </div>
          )}
        </>
      ),
    }] : []),
    ...(news.content ? [{
      title: 'Content',
      children: <Text style={{ whiteSpace: 'pre-wrap' }}>{news.content}</Text>,
    }] : []),
    ...(news.overview ? [{
      title: 'Overview',
      children: <Text>{news.overview}</Text>,
    }] : []),
    ...(news.sources && news.sources.length > 0 ? [{
      title: 'Sources',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {news.sources.map((source: any, index: number) => (
            <Card key={index} p="sm" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={500}>{source.name}</Text>
                  {source.description && (
                    <Text size="sm" c="dimmed">{source.description}</Text>
                  )}
                </div>
                {source.url && (
                  <Anchor href={source.url} target="_blank" rel="noopener noreferrer">
                    <IconExternalLink size={16} />
                  </Anchor>
                )}
              </Group>
            </Card>
          ))}
        </div>
      ),
    }] : []),
    ...(news.tags && news.tags.length > 0 ? [{
      title: 'Tags',
      children: (
        <Group gap="xs">
          {news.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="light" color="blue">
              {tag}
            </Badge>
          ))}
        </Group>
      ),
    }] : []),
    ...(news.seodetails ? [{
      title: 'SEO Details',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <Text fw={500} size="sm">SEO Title</Text>
            <Text size="sm" c="dimmed">{news.seodetails.title || 'Not set'}</Text>
          </div>
          <div>
            <Text fw={500} size="sm">SEO Description</Text>
            <Text size="sm" c="dimmed">{news.seodetails.description || 'Not set'}</Text>
          </div>
          <div>
            <Text fw={500} size="sm">SEO Keywords</Text>
            <Text size="sm" c="dimmed">{news.seodetails.keywords || 'Not set'}</Text>
          </div>
          {news.seodetails.ogimage && (
            <div>
              <Text fw={500} size="sm">OG Image</Text>
              <Image
                src={news.seodetails.ogimage ? `${app.apiBaseUrl}/${news.seodetails.ogimage}` : undefined}
                alt="OG Image"
                width={200}
                height={100}
                radius="md"
                fallbackSrc="https://placehold.co/200x100"
              />
            </div>
          )}
        </div>
      ),
    }] : []),
    {
      title: 'Metadata',
      children: (
        <Grid>
          <Grid.Col span={6}>
            <Text fw={500} size="sm">Reference ID</Text>
            <Text size="sm" c="dimmed">{news.refid}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500} size="sm">Slug</Text>
            <Text size="sm" c="dimmed">{news.slug}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500} size="sm">Created At</Text>
            <Text size="sm" c="dimmed">{new Date(news.createdAt).toLocaleString()}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={500} size="sm">Updated At</Text>
            <Text size="sm" c="dimmed">{new Date(news.updatedAt).toLocaleString()}</Text>
          </Grid.Col>
        </Grid>
      ),
    },
  ];

  return (
    <ViewLayout
      title="View News"
      description="News article details"
      rightSection={
        <Group>
          <Button variant="light" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate(paths.dashboard.news.list)}>
            Back to List
          </Button>
          <Button leftSection={<IconEdit size={16} />} onClick={() => navigate(`${paths.dashboard.news.edit}/${id}`)}>
            Edit News
          </Button>
        </Group>
      }
      sections={sections}
    >
      <div>News content will be displayed here</div>
    </ViewLayout>
  );
}
