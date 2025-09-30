import { NavLink } from 'react-router-dom';
import { Anchor, Button, Group, Stack, StackProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LoginRequestSchema } from '@/api/dtos';
import { Checkbox } from '@/components/forms/checkbox';
import { FormProvider } from '@/components/forms/form-provider';
import { PasswordInput } from '@/components/forms/password-input';
import { TextInput } from '@/components/forms/text-input';
import { useAuth } from '@/hooks';
import { useApiLogin } from '@/hooks/api/auth';
import { paths } from '@/routes';
import { handleFormErrors } from '@/utilities/form';

interface LoginFormProps extends Omit<StackProps, 'children'> {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess, ...props }: LoginFormProps) {
  const { setIsAuthenticated } = useAuth();
  const { login, isLoading } = useApiLogin();

  const form = useForm({
    mode: 'uncontrolled',
    validate: (values) => {
      const result = LoginRequestSchema.safeParse(values);
      if (result.success) return {};
      const flat = result.error.flatten();
      return Object.fromEntries(
        Object.entries(flat.fieldErrors).map(([key, msgs]) => [key, msgs?.[0] || 'Invalid'])
      );
    },
    initialValues: { userName: 'anil', password: '123', remember: true },
  });

  const handleSubmit = form.onSubmit(async (variables) => {
    try {
      await login({ username: variables.userName, password: variables.password });
      setIsAuthenticated(true);
      onSuccess?.();
    } catch (error) {
      handleFormErrors(form, error);
    }
  });

  return (
    <FormProvider form={form} onSubmit={handleSubmit}>
      <Stack {...props}>
        <TextInput name="userName" label="Username" required />
        <PasswordInput name="password" label="Password" required />
        <Group justify="space-between">
          <Checkbox name="remember" label="Remember me" />
        </Group>
        <Button type="submit" loading={isLoading}>
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}
