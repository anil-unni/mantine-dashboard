
import { Container, Title, Text, Stack, Button } from '@mantine/core';
import { PiRocketDuotone } from 'react-icons/pi';

export function Welcome() {
  return (
    <Container size="md">
      <Stack align="center" gap="xl">
        <PiRocketDuotone size={64} style={{ color: 'var(--mantine-color-blue-6)' }} />
        <Title order={1} ta="center">
          Welcome to Your Dashboard
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600}>
          This is your personal dashboard. You can customize this page and add new features
          to make it your own.
        </Text>
        <Button size="lg" variant="filled">
          Get Started
        </Button>
        {/* Tailwind CSS Test */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
          <p className="text-white font-semibold text-center">
            🎉 Tailwind CSS is now integrated with Mantine!
          </p>
        </div>
      </Stack>
    </Container>
  );
}
