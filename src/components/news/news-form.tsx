import React from 'react';
import {
  TextInput,
  Textarea,
  Switch,
  Select,
  MultiSelect,
  Grid,
  NumberInput,
  Text,
  ActionIcon,
  Box,
  Group,
  Stack,
  Paper,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import type { NewsCreateRequest, NewsSource } from '@/api/entities/news';

interface NewsFormProps {
  form: any; // Mantine form object
  mode?: 'create' | 'edit';
}

export function NewsForm({ form, mode = 'create' }: NewsFormProps) {
  const addSource = () => {
    form.insertListItem('sources', { name: '', url: '', description: '' });
  };

  const removeSource = (index: number) => {
    form.removeListItem('sources', index);
  };

  const addImage = () => {
    form.insertListItem('images', '');
  };

  const removeImage = (index: number) => {
    form.removeListItem('images', index);
  };

  return (
    <Stack gap="lg">
      {/* Basic Information */}
      <Paper p="md">
        <Text fw={500} size="lg" mb="md">Basic Information</Text>
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter travel news title (e.g., Best Hidden Beaches in Thailand or New Flight Routes to Europe)"
            required
            {...form.getInputProps('title')}
          />
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Textarea
                label="Description"
                placeholder="Enter travel news description (e.g., 'Discover the most beautiful hidden beaches in Thailand that most tourists don't know about...')"
                required
                minRows={3}
                {...form.getInputProps('description')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Textarea
                label="Overview"
                placeholder="Enter brief travel overview (e.g., A comprehensive guide to Thailand's best-kept beach secrets...)"
                minRows={3}
                {...form.getInputProps('overview')}
              />
            </Grid.Col>
          </Grid>
          <Textarea
            label="Content"
            placeholder="Enter full travel article content with detailed information, tips, and recommendations"
            required
            minRows={4}
            {...form.getInputProps('content')}
          />
        </Stack>
      </Paper>

      {/* Images */}
      <Paper p="md">
        <Text fw={500} size="lg" mb="md">Images</Text>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Banner Image URL"
                placeholder="https://example.com/travel-banner.jpg"
                {...form.getInputProps('banner_image')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Mobile Banner Image URL"
                placeholder="https://example.com/mobile-travel-banner.jpg"
                {...form.getInputProps('mobile_banner_image')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Thumbnail URL"
                placeholder="https://example.com/travel-thumb.jpg"
                {...form.getInputProps('thumbnail')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="OG Image URL"
                placeholder="https://example.com/travel-og-image.jpg"
                {...form.getInputProps('seodetails.ogimage')}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Banner Image Alt Text"
                placeholder="Describe the travel banner image (e.g., Beautiful beach in Thailand with crystal clear water)"
                {...form.getInputProps('banner_image_alt')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Thumbnail Alt Text"
                placeholder="Describe the travel thumbnail image (e.g., 'Thailand beach destination thumbnail')"
                {...form.getInputProps('thumbnail_alt')}
              />
            </Grid.Col>
          </Grid>

          {/* Additional Images */}
          <Box>
            <Group justify="space-between" mb="sm">
              <Text fw={500}>Additional Images</Text>
              <ActionIcon color="blue" onClick={addImage}>
                <IconPlus size={16} />
              </ActionIcon>
            </Group>
            {form.values.images?.map((_: string, index: number) => (
              <Group key={index} mb="xs">
                <TextInput
                  placeholder="https://example.com/travel-image.jpg"
                  style={{ flex: 1 }}
                  {...form.getInputProps(`images.${index}`)}
                />
                <ActionIcon color="red" onClick={() => removeImage(index)}>
                  <IconTrash size={14} />
                </ActionIcon>
              </Group>
            ))}
          </Box>
        </Stack>
      </Paper>

      {/* Sources */}
      <Paper p="md">
        <Text fw={500} size="lg" mb="md">Sources</Text>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={500}>News Sources</Text>
            <ActionIcon color="blue" onClick={addSource}>
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
          {form.values.sources?.map((_: NewsSource, index: number) => (
            <Paper key={index} p="sm" withBorder>
              <Group justify="space-between" mb="sm">
                <Text fw={500}>Source {index + 1}</Text>
                <ActionIcon color="red" onClick={() => removeSource(index)}>
                  <IconTrash size={14} />
                </ActionIcon>
              </Group>
              <Stack gap="sm">
                <TextInput
                  label="Source Name"
                  placeholder="e.g., Lonely Planet, Travel + Leisure, National Geographic Travel"
                  {...form.getInputProps(`sources.${index}.name`)}
                />
                <TextInput
                  label="Source URL"
                  placeholder="https://example.com/travel-article"
                  {...form.getInputProps(`sources.${index}.url`)}
                />
                <TextInput
                  label="Description"
                  placeholder="Brief description of the travel source"
                  {...form.getInputProps(`sources.${index}.description`)}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      {/* Metadata */}
      <Paper p="md">
        <Text fw={500} size="lg" mb="md">Metadata</Text>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Author"
                placeholder="Travel writer name"
                required
                {...form.getInputProps('author')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Category"
                placeholder="e.g., Destinations, Travel Tips, Adventure"
                required
                {...form.getInputProps('category')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Priority"
                placeholder="1"
                min={1}
                {...form.getInputProps('priority')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DateInput
                label="Publish Date"
                value={form.values.publish_date ? new Date(form.values.publish_date) : null}
                onChange={(date) => form.setFieldValue('publish_date', date || '')}
              />
            </Grid.Col>
          </Grid>

          <MultiSelect
            label="Tags"
            placeholder="Select or add travel tags"
            data={['beaches', 'mountains', 'cities', 'adventure', 'luxury', 'budget', 'family-friendly', 'solo-travel', 'cultural', 'eco-tourism', 'food-travel', 'photography', 'hiking', 'diving', 'wildlife']}
            searchable
            getCreateLabel={(query: string) => `+ Create ${query}`}
            onCreate={(query: string) => {
              const currentTags = form.values.tags || [];
              form.setFieldValue('tags', [...currentTags, query]);
              return { value: query, label: query };
            }}
            {...form.getInputProps('tags')}
          />

          <Grid>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Switch
                label="Featured News"
                {...form.getInputProps('featured', { type: 'checkbox' })}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Switch
                label="Breaking News"
                {...form.getInputProps('breaking_news', { type: 'checkbox' })}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Switch
                label="Active"
                {...form.getInputProps('isActive', { type: 'checkbox' })}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>

      {/* SEO Details */}
      <Paper p="md">
        <Text fw={500} size="lg" mb="md">SEO Details</Text>
        <Stack gap="md">
          <TextInput
            label="SEO Title"
            placeholder="SEO optimized travel title (e.g., Best Beaches in Thailand 2024 | Travel Guide)"
            {...form.getInputProps('seodetails.title')}
          />
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Textarea
                label="SEO Description"
                placeholder="SEO optimized travel description (e.g., Discover the most beautiful beaches in Thailand with our comprehensive travel guide. Find hidden gems, best times to visit, and insider tips.)"
                minRows={3}
                {...form.getInputProps('seodetails.description')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="SEO Keywords"
                placeholder="thailand beaches, travel guide, hidden gems, best time to visit"
                {...form.getInputProps('seodetails.keywords')}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper >
    </Stack >
  );
}
