import React from 'react';
import { Container, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { ReportingDashboard } from '../components/reporting-dashboard/reporting-dashboard';

export function ReportingDashboardPage() {
    const breadcrumbItems = [
        { title: 'Home', href: '/app/dashboard' },
        { title: 'Reports', href: '/app/reporting' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="xl" py="md">
            <Breadcrumbs mb="md">{breadcrumbItems}</Breadcrumbs>
            <ReportingDashboard />
        </Container>
    );
}
