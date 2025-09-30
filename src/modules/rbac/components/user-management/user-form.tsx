import React from 'react';
import { Modal, Stack, TextInput, Group, Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authService } from '@/api/services';
import { UserRegistrationRequest } from '@/types/api';

interface UserFormProps {
    opened: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function UserForm({ opened, onClose, onSuccess }: UserFormProps) {
    const form = useForm<UserRegistrationRequest>({
        initialValues: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirm: '',
        },
        validate: {
            username: (v) => (!v ? 'Username is required' : null),
            email: (v) => (!v ? 'Email is required' : null),
            password: (v) => (v.length < 8 ? 'Minimum 8 characters' : null),
            password_confirm: (v, values) => (v !== values.password ? 'Passwords do not match' : null),
        },
    });

    const handleSubmit = async (values: UserRegistrationRequest) => {
        await authService.register(values);
        form.reset();
        onClose();
        onSuccess?.();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal opened={opened} onClose={handleClose} title="Create User" size="lg" centered>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <Group grow>
                        <TextInput label="First name" {...form.getInputProps('first_name')} />
                        <TextInput label="Last name" {...form.getInputProps('last_name')} />
                    </Group>
                    <Group grow>
                        <TextInput label="Username" required {...form.getInputProps('username')} />
                        <TextInput label="Email" required type="email" {...form.getInputProps('email')} />
                    </Group>
                    <Group grow>
                        <PasswordInput label="Password" required {...form.getInputProps('password')} />
                        <PasswordInput label="Confirm password" required {...form.getInputProps('password_confirm')} />
                    </Group>
                    <Group justify="flex-end">
                        <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}


