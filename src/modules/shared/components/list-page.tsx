import React from 'react';
import { Anchor, Breadcrumbs, Container, Group, Stack, Text, Title } from '@mantine/core';

export type Crumb = { title: string; href: string };

interface ListPageProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Crumb[];
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export function ListPage({ title, subtitle, breadcrumbs, actions, children }: ListPageProps) {
    const breadcrumbItems = (breadcrumbs ?? []).map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>}

            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={2}>{title}</Title>
                        {subtitle && (
                            <Text size="sm" c="dimmed">
                                {subtitle}
                            </Text>
                        )}
                    </div>
                    {actions}
                </Group>

                {children}
            </Stack>
        </Container>
    );
}


