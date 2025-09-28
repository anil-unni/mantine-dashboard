import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
    Title,
    Paper,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    Switch,
    Select,
    MultiSelect,
    Grid,
    NumberInput,
    Divider,
    Text,
    ActionIcon,
    Box,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { PageHeader } from '@/components/page-header';
import { FileUpload, MultipleFileUpload } from '@/components/forms';
import { ConfirmationModal, useConfirmationModal } from '@/components/confirmation-modal';
import { useFormNavigationGuard } from '@/hooks/use-form-navigation-guard';
import { useCreateNews } from '@/hooks/api/news';
import { paths } from '@/routes/paths';
import type { NewsCreateRequest, NewsSource } from '@/api/entities/news';

export default function CreateNewsPage() {
    const navigate = useNavigate();
    const createNewsMutation = useCreateNews();
    const { openModal, opened, closeModal, confirm, config } = useConfirmationModal();

    const form = useForm<NewsCreateRequest>({
        initialValues: {
            title: '',
            description: '',
            content: '',
            banner_image: '',
            mobile_banner_image: '',
            banner_image_alt: '',
            thumbnail: '',
            thumbnail_alt: '',
            priority: 1,
            overview: '',
            images: [],
            sources: [{ name: '', url: '', description: '' }],
            category: '',
            tags: [],
            author: '',
            publish_date: new Date().toISOString(),
            featured: false,
            breaking_news: false,
            seodetails: {
                title: '',
                description: '',
                keywords: '',
                ogimage: '',
            },
            isActive: true,
        },
        validate: {
            title: (value: string) => (!value || value.trim() === '' ? 'Title is required' : null),
            description: (value: string) => (!value || value.trim() === '' ? 'Description is required' : null),
            content: (value: string) => (!value || value.trim() === '' ? 'Content is required' : null),
            author: (value: string) => (!value || value.trim() === '' ? 'Author is required' : null),
            category: (value: string) => (!value || value.trim() === '' ? 'Category is required' : null),
            publish_date: (value: string) => (!value ? 'Publish date is required' : null),
            priority: (value: number) => (!value || value < 1 ? 'Priority must be at least 1' : null),
            'seodetails.title': (value: string) => (!value || value.trim() === '' ? 'SEO title is required' : null),
            'seodetails.description': (value: string) => (!value || value.trim() === '' ? 'SEO description is required' : null),
            'seodetails.keywords': (value: string) => (!value || value.trim() === '' ? 'SEO keywords are required' : null),
            sources: (value: NewsSource[]) => {
                if (!value || value.length === 0) {
                    return 'At least one source is required';
                }
                for (let i = 0; i < value.length; i++) {
                    const source = value[i];
                    if (!source.name || source.name.trim() === '') {
                        return `Source ${i + 1} name is required`;
                    }
                    if (!source.url || source.url.trim() === '') {
                        return `Source ${i + 1} URL is required`;
                    }
                    // Basic URL validation
                    try {
                        new URL(source.url);
                    } catch {
                        return `Source ${i + 1} URL must be a valid URL`;
                    }
                }
                return null;
            },
        },
    });

    // Check if form has unsaved changes
    const hasUnsavedChanges = form.isDirty();
    const { handleNavigation } = useFormNavigationGuard({
        hasUnsavedChanges,
        message: 'You have unsaved changes. Are you sure you want to leave?',
        title: 'Unsaved Changes',
    });

    const handleSubmit = async (values: NewsCreateRequest) => {
        try {
            await createNewsMutation.mutateAsync(values);
            handleNavigation(paths.dashboard.news.list);
        } catch (error) {
            // Error handling is done in the mutation
        }
    };

    const addSource = () => {
        form.insertListItem('sources', { name: '', url: '', description: '' });
    };

    const removeSource = (index: number) => {
        form.removeListItem('sources', index);
    };


    return (
        <Box p="md">
            <PageHeader
                title="Create News"
                description="Add a new news article"
                rightSection={
                    <Button variant="light" onClick={() => handleNavigation(paths.dashboard.news.list)}>
                        Back to List
                    </Button>
                }
            />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    {/* Basic Information */}
                    <Paper p="md">
                        <Title order={4} mb="md">Basic Information</Title>
                        <Stack gap="md">
                            <TextInput
                                label="Title"
                                placeholder="Enter news title"
                                required
                                {...form.getInputProps('title')}
                            />
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Textarea
                                        label="Description"
                                        placeholder="Enter news description"
                                        required
                                        minRows={3}
                                        {...form.getInputProps('description')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Textarea
                                        label="Overview"
                                        placeholder="Enter brief overview"
                                        minRows={3}
                                        {...form.getInputProps('overview')}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Textarea
                                label="Content"
                                placeholder="Enter full news content"
                                minRows={4}
                                required
                                {...form.getInputProps('content')}
                            />
                        </Stack>
                    </Paper>

                    {/* Images */}
                    <Paper p="md">
                        <Title order={4} mb="md">Images</Title>
                        <Stack gap="md">
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <FileUpload
                                        label="Banner Image"
                                        placeholder="Upload banner image or enter URL"
                                        value={form.values.banner_image}
                                        onChange={(value: string | File | null) => form.setFieldValue('banner_image', value || '')}
                                        accept="image/*"
                                        description="Main banner image for the news article (recommended: 1200x630px)"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <FileUpload
                                        label="Mobile Banner Image"
                                        placeholder="Upload mobile banner image or enter URL"
                                        value={form.values.mobile_banner_image}
                                        onChange={(value: string | File | null) => form.setFieldValue('mobile_banner_image', value || '')}
                                        accept="image/*"
                                        description="Mobile-optimized banner image (recommended: 800x600px)"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <FileUpload
                                        label="Thumbnail Image"
                                        placeholder="Upload thumbnail image or enter URL"
                                        value={form.values.thumbnail}
                                        onChange={(value: string | File | null) => form.setFieldValue('thumbnail', value || '')}
                                        accept="image/*"
                                        description="Thumbnail image for listings (recommended: 300x200px)"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <FileUpload
                                        label="OG Image"
                                        placeholder="Upload OG image or enter URL"
                                        value={form.values.seodetails?.ogimage}
                                        onChange={(value: string | File | null) => form.setFieldValue('seodetails.ogimage', typeof value === 'string' ? value : '')}
                                        accept="image/*"
                                        description="Open Graph image for social sharing"
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="Banner Image Alt Text"
                                        placeholder="Describe the banner image"
                                        {...form.getInputProps('banner_image_alt')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="Thumbnail Alt Text"
                                        placeholder="Describe the thumbnail image"
                                        {...form.getInputProps('thumbnail_alt')}
                                    />
                                </Grid.Col>
                            </Grid>

                            {/* Additional Images */}
                            <MultipleFileUpload
                                label="Additional Images"
                                placeholder="Upload additional images or add URLs"
                                values={form.values.images || []}
                                onChange={(values: (string | File)[]) => form.setFieldValue('images', values)}
                                accept="image/*"
                                description="Supporting images for the news article (recommended: 800x600px each)"
                            />
                        </Stack>
                    </Paper>

                    {/* Sources */}
                    <Paper p="md">
                        <Title order={4} mb="md">Sources</Title>
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={500}>News Sources <Text span c="red">*</Text></Text>
                                <Button size="xs" leftSection={<IconPlus size={14} />} onClick={addSource}>
                                    Add Source
                                </Button>
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
                                            placeholder="e.g., BBC News"
                                            required
                                            {...form.getInputProps(`sources.${index}.name`)}
                                        />
                                        <TextInput
                                            label="Source URL"
                                            placeholder="https://example.com/article"
                                            required
                                            {...form.getInputProps(`sources.${index}.url`)}
                                        />
                                        <TextInput
                                            label="Description"
                                            placeholder="Brief description of the source"
                                            {...form.getInputProps(`sources.${index}.description`)}
                                        />
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Metadata */}
                    <Paper p="md">
                        <Title order={4} mb="md">Metadata</Title>
                        <Stack gap="md">
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="Author"
                                        placeholder="Author name"
                                        required
                                        {...form.getInputProps('author')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="Category"
                                        placeholder="e.g., Technology"
                                        required
                                        {...form.getInputProps('category')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <NumberInput
                                        label="Priority"
                                        placeholder="1"
                                        min={1}
                                        required
                                        {...form.getInputProps('priority')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <DateInput
                                        label="Publish Date"
                                        required
                                        value={form.values.publish_date ? new Date(form.values.publish_date) : null}
                                        onChange={(date: string | null) => form.setFieldValue('publish_date', date || '')}
                                    />
                                </Grid.Col>
                            </Grid>

                            <MultiSelect
                                label="Tags"
                                placeholder="Select or add tags"
                                data={['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Politics']}
                                searchable
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
                        <Title order={4} mb="md">SEO Details</Title>
                        <Stack gap="md">
                            <TextInput
                                label="SEO Title"
                                placeholder="SEO optimized title"
                                required
                                {...form.getInputProps('seodetails.title')}
                            />
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Textarea
                                        label="SEO Description"
                                        placeholder="SEO optimized description"
                                        minRows={3}
                                        required
                                        {...form.getInputProps('seodetails.description')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <TextInput
                                        label="SEO Keywords"
                                        placeholder="keyword1, keyword2, keyword3"
                                        required
                                        {...form.getInputProps('seodetails.keywords')}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    {/* Actions */}
                    <Group justify="flex-end">
                        <Button variant="light" onClick={() => handleNavigation(paths.dashboard.news.list)}>
                            Cancel
                        </Button>
                        <Button type="submit" loading={createNewsMutation.isPending}>
                            Create News
                        </Button>
                    </Group>
                </Stack>
            </form>

            <ConfirmationModal
                opened={opened}
                onClose={closeModal}
                onConfirm={confirm}
                title={config.title || ''}
                message={config.message || ''}
                confirmLabel={config.confirmLabel}
                cancelLabel={config.cancelLabel}
                confirmColor={config.confirmColor}
                type={config.type}
                loading={createNewsMutation.isPending}
            />
        </Box>
    );
}
