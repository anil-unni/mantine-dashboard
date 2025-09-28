import { Grid, Skeleton } from '@mantine/core';
import {
    IconUsers,
    IconShoppingCart,
    IconPackage,
    IconMessageCircle,
    IconCurrencyDollar,
    IconMail,
    IconHelp,
    IconNews,
    IconArticle,
    IconStar
} from '@tabler/icons-react';

import { MetricCard } from '@/components/metric-card';
import { formatInt } from '@/utilities/number';
import type { SummaryCards } from '@/api/entities/dashboard';

interface SummaryCardsProps {
    data?: SummaryCards;
    isLoading?: boolean;
}

const cardConfig = [
    {
        key: 'totalUsers' as keyof SummaryCards,
        title: 'Total Users',
        icon: IconUsers,
        color: 'blue',
    },
    {
        key: 'totalOrders' as keyof SummaryCards,
        title: 'Total Orders',
        icon: IconShoppingCart,
        color: 'green',
    },
    {
        key: 'totalPackages' as keyof SummaryCards,
        title: 'Total Packages',
        icon: IconPackage,
        color: 'orange',
    },
    {
        key: 'totalQueries' as keyof SummaryCards,
        title: 'Total Queries',
        icon: IconMessageCircle,
        color: 'purple',
    },
    {
        key: 'totalRevenue' as keyof SummaryCards,
        title: 'Total Revenue',
        icon: IconCurrencyDollar,
        color: 'teal',
    },
    {
        key: 'totalContactForms' as keyof SummaryCards,
        title: 'Contact Forms',
        icon: IconMail,
        color: 'cyan',
    },
    {
        key: 'totalEnquiries' as keyof SummaryCards,
        title: 'Enquiries',
        icon: IconHelp,
        color: 'pink',
    },
    {
        key: 'totalNews' as keyof SummaryCards,
        title: 'News Articles',
        icon: IconNews,
        color: 'indigo',
    },
    {
        key: 'totalBlogs' as keyof SummaryCards,
        title: 'Blog Posts',
        icon: IconArticle,
        color: 'lime',
    },
    {
        key: 'totalTestimonials' as keyof SummaryCards,
        title: 'Testimonials',
        icon: IconStar,
        color: 'yellow',
    },
];

export function SummaryCardsGrid({ data, isLoading }: SummaryCardsProps) {
    if (isLoading) {
        return (
            <Grid>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
                        <MetricCard.Root p="md">
                            <Skeleton height={20} mb="xs" />
                            <Skeleton height={32} mb="xs" />
                            <Skeleton height={16} width="60%" />
                        </MetricCard.Root>
                    </Grid.Col>
                ))}
            </Grid>
        );
    }

    if (!data) return null;

    return (
        <Grid>
            {cardConfig.map(({ key, title, icon: Icon, color }) => {
                const cardData = data[key];
                const isRevenue = key === 'totalRevenue';

                return (
                    <Grid.Col key={key} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
                        <MetricCard.Root p="md">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <Icon size={20} color={`var(--mantine-color-${color}-6)`} />
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: 'var(--mantine-color-dimmed)' }}>
                                    {title}
                                </span>
                            </div>

                            <MetricCard.TextEmphasis mb="xs">
                                {isRevenue ? `₹${formatInt(cardData.value)}` : formatInt(cardData.value)}
                            </MetricCard.TextEmphasis>

                            <MetricCard.TextTrend value={cardData.growth}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--mantine-color-dimmed)' }}>
                                    vs last period
                                </span>
                            </MetricCard.TextTrend>
                        </MetricCard.Root>
                    </Grid.Col>
                );
            })}
        </Grid>
    );
}
