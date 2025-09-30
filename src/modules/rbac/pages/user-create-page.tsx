import React, { useState } from 'react';
import { Container, Title, Button } from '@mantine/core';
import { UserForm } from '../components/user-management/user-form';

export function UserCreatePage() {
    const [open, setOpen] = useState(true);

    return (
        <Container size="sm" py="md">
            <Title order={2} mb="md">Create User</Title>
            <Button onClick={() => setOpen(true)} mb="md">Open Form</Button>
            <UserForm opened={open} onClose={() => setOpen(false)} />
        </Container>
    );
}

export default UserCreatePage;


