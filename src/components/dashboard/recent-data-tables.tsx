import { Grid, Card, Title, Table, Text, Badge, Skeleton, ScrollArea } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import type { Tables } from '@/api/entities/dashboard';

interface RecentDataTablesProps {
    data?: Tables;
    isLoading?: boolean;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'success':
        case 'confirmed':
            return 'green';
        case 'pending':
            return 'yellow';
        case 'failed':
        case 'cancelled':
            return 'red';
        default:
            return 'blue';
    }
};

export function RecentDataTables({ data, isLoading }: RecentDataTablesProps) {
    if (isLoading) {
        return (
            <Grid>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                        <Card p="md">
                            <Skeleton height={20} mb="md" />
                            <Skeleton height={200} />
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        );
    }

    if (!data) return null;

    return (
        <Grid>
            {/* Recent Users */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent Users</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Phone</Table.Th>
                                    <Table.Th>Joined</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentUsers.map((user) => (
                                    <Table.Tr key={user.id}>
                                        <Table.Td>
                                            <Text fw={500}>{user.name}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{user.email}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">{user.phone}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {dayjs(user.createdAt).fromNow()}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>

            {/* Recent Orders */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent Orders</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Order #</Table.Th>
                                    <Table.Th>Customer</Table.Th>
                                    <Table.Th>Package</Table.Th>
                                    <Table.Th>Amount</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentOrders.map((order) => (
                                    <Table.Tr key={order.id}>
                                        <Table.Td>
                                            <Text fw={500}>{order.orderNo}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">{order.customer}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{order.package}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" fw={500}>₹{parseInt(order.amount).toLocaleString('en-IN')}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color={getStatusColor(order.paymentStatus)} size="sm">
                                                {order.paymentStatus}
                                            </Badge>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>

            {/* Recent Queries */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent Queries</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Message</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentQueries.map((query) => (
                                    <Table.Tr key={query.id}>
                                        <Table.Td>
                                            <Text fw={500}>{query.name}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{query.email}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" lineClamp={2} style={{ maxWidth: 200 }}>
                                                {query.message}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {dayjs(query.createdAt).fromNow()}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>

            {/* Recent Contact Forms */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent Contact Forms</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentContactForms.map((form) => (
                                    <Table.Tr key={form.id}>
                                        <Table.Td>
                                            <Text fw={500}>{form.name}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">{form.email}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color={form.status === 1 ? 'green' : 'yellow'} size="sm">
                                                {form.status === 1 ? 'Read' : 'Unread'}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {dayjs(form.createdAt).fromNow()}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>

            {/* Recent News */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent News</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Title</Table.Th>
                                    <Table.Th>Category</Table.Th>
                                    <Table.Th>Featured</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentNews.map((news) => (
                                    <Table.Tr key={news.id}>
                                        <Table.Td>
                                            <Text fw={500} lineClamp={1} style={{ maxWidth: 200 }}>
                                                {news.title}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge size="sm" variant="light">
                                                {news.category}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {news.featured && <Badge color="blue" size="sm">Featured</Badge>}
                                                {news.breaking && <Badge color="red" size="sm">Breaking</Badge>}
                                            </div>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {dayjs(news.createdAt).fromNow()}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>

            {/* Recent Blogs */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="md">
                    <Title order={4} mb="md">Recent Blogs</Title>
                    <ScrollArea>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Title</Table.Th>
                                    <Table.Th>Priority</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {data.recentBlogs.map((blog) => (
                                    <Table.Tr key={blog.id}>
                                        <Table.Td>
                                            <Text fw={500} lineClamp={1} style={{ maxWidth: 250 }}>
                                                {blog.title}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color={blog.priority === 1 ? 'red' : 'blue'} size="sm">
                                                Priority {blog.priority}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm" c="dimmed">
                                                {dayjs(blog.createdAt).fromNow()}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Card>
            </Grid.Col>
        </Grid>
    );
}
