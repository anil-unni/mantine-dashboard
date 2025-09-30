import React from 'react';
import { Container, Title, Breadcrumbs, Anchor, Stack, Card, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DashboardCardFormData } from '../types';
import { useAnalytics } from '../hooks/use-analytics';

export function DashboardCardCreatePage() {
    const navigate = useNavigate();
    const { createCard } = useAnalytics();

    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Analytics', href: '/app/analytics' },
        { title: 'Cards', href: '/app/analytics/cards' },
        { title: 'Create Card', href: '/app/analytics/cards/create' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const handleCreateCard = async (data: DashboardCardFormData) => {
        try {
            await createCard(data);
            navigate('/app/analytics/cards');
        } catch (error) {
            console.error('Failed to create dashboard card:', error);
        }
    };

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>

            <Stack gap="lg">
                <div>
                    <Title order={2}>Create Dashboard Card</Title>
                    <Text c="dimmed" size="sm">
                        Create a new dashboard card to display analytics data
                    </Text>
                </div>

                <Card withBorder>
                    <Text c="dimmed">
                        Dashboard card creation form will be implemented here.
                    </Text>
                </Card>
            </Stack>
        </Container>
    );
}
