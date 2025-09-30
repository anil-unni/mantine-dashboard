import React from 'react';
import { Button, Card, Grid, Group, MultiSelect, NumberInput, Select, Stack, Switch, Textarea, TextInput, Title } from '@mantine/core';
// Using native date inputs to keep values as strings matching API types
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
// import { PriorityEnum, StatusEnum } from '@/types/api';
import { ProjectFormData } from '../../types';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional().nullable(),
    status: z.enum(['planning', 'active', 'on_hold', 'completed', 'cancelled']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    start_date: z.string().optional().nullable(),
    end_date: z.string().optional().nullable(),
    project_manager: z.number().optional(),
    team_members: z.array(z.number()).default([]),
    budget: z.string().optional().nullable(),
    tags: z.record(z.string(), z.any()).optional(),
    settings: z.record(z.string(), z.any()).optional(),
    is_active: z.boolean().optional(),
});

export interface ProjectFormProps {
    initialValues?: Partial<ProjectFormData>;
    onSubmit: (values: ProjectFormData) => Promise<void> | void;
    isSubmitting?: boolean;
}

export function ProjectForm({ initialValues, onSubmit, isSubmitting }: ProjectFormProps) {
    const form = useForm<ProjectFormData>({
        initialValues: {
            name: '',
            description: '',
            status: 'planning',
            priority: 'medium',
            start_date: undefined,
            end_date: undefined,
            project_manager: undefined,
            team_members: [],
            budget: '',
            tags: {},
            settings: {},
            ...initialValues,
        },
        validate: zodResolver(schema as any),
    });

    return (
        <Card withBorder>
            <form
                onSubmit={form.onSubmit(async (values) => {
                    await onSubmit(values);
                })}
            >
                <Stack>
                    <Title order={4}>Project details</Title>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput label="Name" placeholder="Project name" required {...form.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                label="Status"
                                data={[
                                    { value: 'planning', label: 'Planning' },
                                    { value: 'active', label: 'Active' },
                                    { value: 'on_hold', label: 'On hold' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'cancelled', label: 'Cancelled' },
                                ]}
                                {...form.getInputProps('status')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                label="Priority"
                                data={[
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                    { value: 'urgent', label: 'Urgent' },
                                ]}
                                {...form.getInputProps('priority')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <NumberInput label="Budget" placeholder="e.g. 10000" {...form.getInputProps('budget')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput type="date" label="Start date" {...form.getInputProps('start_date')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput type="date" label="End date" {...form.getInputProps('end_date')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <NumberInput label="Project manager (user id)" {...form.getInputProps('project_manager')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <MultiSelect
                                label="Team members (user ids)"
                                data={(form.values.team_members || []).map((id) => ({ value: String(id), label: String(id) }))}
                                value={(form.values.team_members || []).map(String)}
                                onChange={(vals) => form.setFieldValue('team_members', vals.map((v) => Number(v)))}
                                searchable
                                placeholder="Add user ids"
                                nothingFoundMessage="Type to add ids"
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Textarea label="Description" minRows={3} {...form.getInputProps('description')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                label="Tags (JSON)"
                                placeholder='{"key":"value"}'
                                value={JSON.stringify(form.values.tags ?? {})}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.currentTarget.value || '{}');
                                        form.setFieldValue('tags', parsed);
                                    } catch {
                                        // ignore invalid JSON while typing
                                    }
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                label="Settings (JSON)"
                                placeholder='{"key":"value"}'
                                value={JSON.stringify(form.values.settings ?? {})}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.currentTarget.value || '{}');
                                        form.setFieldValue('settings', parsed);
                                    } catch {
                                        // ignore invalid JSON while typing
                                    }
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Switch label="Active" checked={Boolean((form.values as any).is_active)} onChange={(e) => form.setFieldValue('is_active' as any, e.currentTarget.checked)} />
                        </Grid.Col>
                    </Grid>

                    <Group justify="flex-end">
                        <Button type="submit" loading={isSubmitting}>Create project</Button>
                    </Group>
                </Stack>
            </form>
        </Card>
    );
}


