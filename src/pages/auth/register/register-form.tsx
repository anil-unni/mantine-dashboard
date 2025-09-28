import { NavLink } from 'react-router-dom';
import {
  Anchor,
  Button,
  Checkbox,
  Grid,
  PasswordInput,
  Stack,
  StackProps,
  Text,
  TextInput,
} from '@mantine/core';
import { paths } from '@/routes';

interface RegisterFormProps extends Omit<StackProps, 'children'> {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess, ...props }: RegisterFormProps) {
  return (
    <Stack {...props}>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput label="First name" required />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput label="Last name" required />
        </Grid.Col>
      </Grid>
      <TextInput label="Email" required />
      <PasswordInput label="Password" required />
      <Checkbox
        label={
          <Text fz="inherit" c="inherit" lh="inherit">
            By signing up you have agreed to our{' '}
            <Anchor fz="inherit" lh="inherit" component={NavLink} to={paths.auth.terms}>
              Terms
            </Anchor>{' '}
            &{' '}
            <Anchor fz="inherit" lh="inherit" component={NavLink} to={paths.auth.privacy}>
              Privacy Policy
            </Anchor>
          </Text>
        }
      />
      <Button>Register</Button>
    </Stack>
  );
}
