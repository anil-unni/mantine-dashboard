import React from 'react';
import {
    Modal,
    Button,
    Group,
    Text,
    Stack,
    Alert,
    ThemeIcon,
} from '@mantine/core';
import { IconAlertTriangle, IconTrash, IconX } from '@tabler/icons-react';

export interface ConfirmationModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: string;
    loading?: boolean;
    type?: 'delete' | 'warning' | 'info';
    children?: React.ReactNode;
}

export function ConfirmationModal({
    opened,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmColor = 'red',
    loading = false,
    type = 'warning',
    children,
}: ConfirmationModalProps) {
    const getIcon = () => {
        switch (type) {
            case 'delete':
                return <IconTrash size="1.5rem" />;
            case 'warning':
                return <IconAlertTriangle size="1.5rem" />;
            case 'info':
                return <IconX size="1.5rem" />;
            default:
                return <IconAlertTriangle size="1.5rem" />;
        }
    };

    const getAlertColor = () => {
        switch (type) {
            case 'delete':
                return 'red';
            case 'warning':
                return 'orange';
            case 'info':
                return 'blue';
            default:
                return 'orange';
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            centered
            size="sm"
            closeOnClickOutside={false}
            closeOnEscape={false}
        >
            <Stack gap="md">
                <Alert
                    icon={getIcon()}
                    title={title}
                    color={getAlertColor()}
                    variant="light"
                >
                    <Text size="sm">{message}</Text>
                </Alert>

                {children}

                <Group justify="flex-end" gap="sm">
                    <Button
                        variant="light"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        color={confirmColor}
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}

// Hook for easy confirmation modal usage
export function useConfirmationModal() {
    const [opened, setOpened] = React.useState(false);
    const [config, setConfig] = React.useState<Partial<ConfirmationModalProps>>({});

    const openModal = (modalConfig: Partial<ConfirmationModalProps>) => {
        setConfig(modalConfig);
        setOpened(true);
    };

    const closeModal = () => {
        setOpened(false);
        setConfig({});
    };

    const confirm = () => {
        config.onConfirm?.();
        closeModal();
    };

    return {
        opened,
        config,
        openModal,
        closeModal,
        confirm,
    };
}
