import { Stack } from '@mantine/core';
import { Page } from '@/components/page';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <Page title="Login">
      <Stack gap="xl">
        <LoginForm />
      </Stack>
    </Page>
  );
}
