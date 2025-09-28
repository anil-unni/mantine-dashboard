import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Switch,
  Grid,
  Image,
  Box,
  Text,
  Title,
  Paper,
} from '@mantine/core';
import { TwoColumnLayout } from '@/components/layouts';
import { FileUpload } from '@/components/forms';
import { useNewsPage, useUpdateNewsPage } from '@/hooks/api/news';
import { paths } from '@/routes/paths';
import { app } from '@/config';
import type { NewsPageUpdateRequest } from '@/api/entities/news';

export default function NewsPageConfigPage() {
  const navigate = useNavigate();
  const { data: newsPage, isLoading } = useNewsPage();
  const updateNewsPageMutation = useUpdateNewsPage();

  const form = useForm<NewsPageUpdateRequest>({
    initialValues: {
      title: '',
      image: '',
      mobileImg: '',
      description: '',
      seodetails: {
        title: '',
        description: '',
        keywords: '',
        ogimage: '',
      },
      isActive: true,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),

    },
  });

  // Update form when news page data loads
  React.useEffect(() => {
    if (newsPage) {
      form.setValues({
        title: newsPage.title,
        image: newsPage.image,
        mobileImg: newsPage.mobileImg,
        description: newsPage.description,
        seodetails: newsPage.seodetails,
        isActive: newsPage.isActive,
      });
    }
  }, [newsPage]);

  const handleSubmit = async (values: NewsPageUpdateRequest) => {
    try {
      await updateNewsPageMutation.mutateAsync(values);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  if (isLoading) {
    return (
      <TwoColumnLayout
        title="News Page Configuration"
        description="Loading configuration..."
        leftContent={<div>Loading...</div>}
        rightContent={<div>Loading...</div>}
      />
    );
  }

  const leftContent = (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {/* Basic Configuration */}
        <Paper p="md">
          <Title order={4} mb="md">Page Configuration</Title>
          <Stack gap="md">
            <TextInput
              label="Page Title"
              placeholder="e.g., News & Updates"
              required
              {...form.getInputProps('title')}
            />
            <Textarea
              label="Page Description"
              placeholder="Brief description of the news page"
              minRows={2}
              {...form.getInputProps('description')}
            />
            <Switch
              label="Active"
              description="Enable or disable the news page"
              {...form.getInputProps('isActive', { type: 'checkbox' })}
            />
          </Stack>
        </Paper>

        {/* Images */}
        <Paper p="md">
          <Title order={4} mb="md">Page Images</Title>
          <Stack gap="md">
            <FileUpload
              label="Desktop Banner Image"
              placeholder="Upload desktop banner image or enter URL"
              value={form.values.image}
              onChange={(value: string | File | null) => form.setFieldValue('image', value || '')}
              accept="image/*"
              description="Main banner image for desktop view (recommended: 1200x630px)"
            />
            <FileUpload
              label="Mobile Banner Image"
              placeholder="Upload mobile banner image or enter URL"
              value={form.values.mobileImg}
              onChange={(value: string | File | null) => form.setFieldValue('mobileImg', value || '')}
              accept="image/*"
              description="Mobile-optimized banner image (recommended: 800x600px)"
            />
          </Stack>
        </Paper>

        {/* SEO Configuration */}
        <Paper p="md">
          <Title order={4} mb="md">SEO Configuration</Title>
          <Stack gap="md">
            <TextInput
              label="SEO Title"
              placeholder="e.g., News & Updates - Your Company"
              {...form.getInputProps('seodetails.title')}
            />
            <Textarea
              label="SEO Description"
              placeholder="SEO optimized description for search engines"
              minRows={2}
              {...form.getInputProps('seodetails.description')}
            />
            <TextInput
              label="SEO Keywords"
              placeholder="news, updates, company, latest"
              {...form.getInputProps('seodetails.keywords')}
            />
            <TextInput
              label="OG Image URL"
              placeholder="https://example.com/og-image.jpg"
              {...form.getInputProps('seodetails.ogimage')}
            />
          </Stack>
        </Paper>

        {/* Actions */}
        <Group justify="flex-end">
          <Button variant="light" onClick={() => navigate(paths.dashboard.news.list)}>
            Cancel
          </Button>
          <Button type="submit" loading={updateNewsPageMutation.isPending}>
            Update Configuration
          </Button>
        </Group>
      </Stack>
    </form>
  );

  const rightContent = (
    <Paper p="md" style={{ position: 'sticky', top: '1rem' }}>
      <Title order={4} mb="md">Live Preview</Title>
      <Stack gap="md">
        {/* Page Title Preview */}
        <Box>
          <Text fw={500} size="sm" mb="xs">Page Title</Text>
          <Text size="lg" fw={600}>{form.values.title || 'Not set'}</Text>
        </Box>

        {/* Page Description Preview */}
        <Box>
          <Text fw={500} size="sm" mb="xs">Page Description</Text>
          <Text c="dimmed" size="sm">{form.values.description || 'Not set'}</Text>
        </Box>

        {/* Status Preview */}
        <Box>
          <Text fw={500} size="sm" mb="xs">Status</Text>
          <Text c={form.values.isActive ? 'green' : 'red'} size="sm">
            {form.values.isActive ? 'Active' : 'Inactive'}
          </Text>
        </Box>

        {/* Image Previews */}
        {(form.values.image || form.values.mobileImg) && (
          <Box>
            <Text fw={500} size="sm" mb="xs">Image Previews</Text>
            <Stack gap="sm">
              {form.values.image && (
                <Box>
                  <Text size="xs" c="dimmed" mb="xs">Desktop Banner</Text>
                  <Image
                    src={app.apiBaseUrl + '/' + form.values.image}
                    alt="Desktop banner preview"
                    width="100%"
                    height={120}
                    radius="md"
                    fallbackSrc="https://placehold.co/400x120"
                  />
                </Box>
              )}
              {form.values.mobileImg && (
                <Box>
                  <Text size="xs" c="dimmed" mb="xs">Mobile Banner</Text>
                  <Image
                    src={app.apiBaseUrl + '/' + form.values.mobileImg}
                    alt="Mobile banner preview"
                    width="100%"
                    height={120}
                    radius="md"
                    fallbackSrc="https://placehold.co/400x120"
                  />
                </Box>
              )}
            </Stack>
          </Box>
        )}

        {/* SEO Preview */}
        <Box>
          <Text fw={500} size="sm" mb="xs">SEO Preview</Text>
          <Stack gap="xs">
            <Box>
              <Text size="xs" c="dimmed">SEO Title</Text>
              <Text size="sm">{form.values.seodetails?.title || 'Not set'}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">SEO Description</Text>
              <Text size="sm" c="dimmed">{form.values.seodetails?.description || 'Not set'}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">Keywords</Text>
              <Text size="sm" c="dimmed">{form.values.seodetails?.keywords || 'Not set'}</Text>
            </Box>
            {form.values.seodetails?.ogimage && (
              <Box>
                <Text size="xs" c="dimmed" mb="xs">OG Image</Text>
                <Image
                  src={form.values.seodetails?.ogimage ? `${app.apiBaseUrl}/${form.values.seodetails.ogimage}` : undefined}
                  alt="OG Image preview"
                  width={150}
                  height={75}
                  radius="md"
                  fallbackSrc="https://placehold.co/150x75"
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <TwoColumnLayout
      title="News Page Configuration"
      description="Configure the news page settings and SEO"
      rightSection={
        <Button variant="light" onClick={() => navigate(paths.dashboard.news.list)}>
          Back to News
        </Button>
      }
      leftContent={leftContent}
      rightContent={rightContent}
      stickyRight={true}
    />
  );
}
