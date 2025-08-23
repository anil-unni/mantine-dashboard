import { PiArrowLeft as GoBackIcon } from 'react-icons/pi';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, SimpleGrid } from '@mantine/core';
import { Logo } from '@/components/logo';

export function AuthLayout() {
  const navigate = useNavigate();

  return (
    <SimpleGrid mih="100vh" p="md" cols={{ base: 1, lg: 2 }}>
      <Flex direction="column" align="flex-start">
        <Button
          c="inherit"
          variant="subtle"
          leftSection={<GoBackIcon size="1rem" />}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>

        <Center flex={1} w="100%">
          <Box maw="25rem">
            <Logo size="3rem" display="block" c="var(--mantine-primary-color-filled)" mb="xl" />
            <Outlet />
          </Box>
        </Center>
      </Flex>

      <Center
        ta="center"
        p="4rem"
        bg="var(--mantine-color-default-hover)"
        display={{ base: 'none', lg: 'flex' }}
        style={{ borderRadius: 'var(--mantine-radius-md)' }}
      >
      </Center>
    </SimpleGrid>
  );
}
