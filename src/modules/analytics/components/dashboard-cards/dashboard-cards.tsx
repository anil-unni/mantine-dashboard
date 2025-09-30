import React from 'react';
import { Container, Title, Text } from '@mantine/core';

export function DashboardCards() {
    return (
        <Container size="xl" py="md">
            <Title order={2} mb="md">Dashboard Cards</Title>
            <Text c="dimmed">Dashboard cards management will be implemented here.</Text>
        </Container>
    );
}
