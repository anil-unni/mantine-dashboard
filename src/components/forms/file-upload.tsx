import React, { useRef, useState } from 'react';
import {
    TextInput,
    Button,
    Group,
    Text,
    Image,
    ActionIcon,
    Box,
    Stack,
    FileInput,
    Alert,
    Modal,
} from '@mantine/core';
import { IconUpload, IconX, IconPhoto, IconAlertCircle } from '@tabler/icons-react';
import { app } from '@/config';

interface FileUploadProps {
    label: string;
    placeholder?: string;
    value?: string | File | null;
    onChange: (value: string | File | null) => void;
    accept?: string;
    multiple?: boolean;
    error?: string;
    description?: string;
    preview?: boolean;
    required?: boolean;
}

export function FileUpload({
    label,
    placeholder = 'Select a file',
    value,
    onChange,
    accept = 'image/*',
    multiple = false,
    error,
    description,
    preview = true,
    required = false,
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [urlModalOpened, setUrlModalOpened] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    // Helper function to get full image URL
    const getImageUrl = (imageValue: string | File | null): string | null => {
        if (!imageValue) return null;
        if (imageValue instanceof File) {
            return URL.createObjectURL(imageValue);
        }
        // If it's a string and starts with 'uploads/', prepend the API base URL
        if (typeof imageValue === 'string' && imageValue.startsWith('uploads/')) {
            return `${app.apiBaseUrl}/${imageValue}`;
        }
        // If it's already a full URL, return as is
        if (typeof imageValue === 'string' && (imageValue.startsWith('http://') || imageValue.startsWith('https://'))) {
            return imageValue;
        }
        // For other relative paths, prepend the API base URL
        if (typeof imageValue === 'string') {
            return `${app.apiBaseUrl}/${imageValue}`;
        }
        return imageValue;
    };

    // Handle file selection
    const handleFileSelect = (file: File | null) => {
        if (file) {
            onChange(file);
            if (preview && file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        } else {
            onChange(null);
            setPreviewUrl(null);
        }
    };

    // Handle drag and drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    // Handle URL input
    const handleUrlChange = (url: string) => {
        onChange(url);
        setPreviewUrl(getImageUrl(url));
    };

    // Handle URL modal
    const openUrlModal = () => {
        setUrlInput('');
        setUrlModalOpened(true);
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            handleUrlChange(urlInput.trim());
            setUrlModalOpened(false);
        }
    };

    const handleUrlCancel = () => {
        setUrlInput('');
        setUrlModalOpened(false);
    };

    // Clear file
    const clearFile = () => {
        onChange(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Get current value for display
    const currentValue = value instanceof File ? value.name : value || '';

    return (
        <>
            <Stack gap="sm">
                <Text size="sm" fw={500}>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                </Text>

                {description && (
                    <Text size="xs" c="dimmed">
                        {description}
                    </Text>
                )}

                {/* File Upload Area */}
                <Box
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{
                        border: `2px dashed ${dragActive ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-4)'}`,
                        borderRadius: 'var(--mantine-radius-md)',
                        padding: 'var(--mantine-spacing-md)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: dragActive ? 'var(--mantine-color-blue-0)' : 'transparent',
                        transition: 'all 0.2s ease',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Stack gap="sm" align="center">
                        <IconPhoto size={48} color="var(--mantine-color-gray-5)" />
                        <Text size="sm" c="dimmed">
                            {dragActive ? 'Drop file here' : 'Click to upload or drag and drop'}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {accept === 'image/*' ? 'PNG, JPG, JPEG, WebP, GIF up to 100MB' : 'Any file type'}
                        </Text>
                    </Stack>
                </Box>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                            onChange(file);
                            if (preview && file.type.startsWith('image/')) {
                                const url = URL.createObjectURL(file);
                                setPreviewUrl(url);
                            }
                        } else {
                            onChange(null);
                            setPreviewUrl(null);
                        }
                    }}
                    style={{ display: 'none' }}
                />

                {/* Current file display */}
                {currentValue && (
                    <Box
                        p="sm"
                        style={{
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: 'var(--mantine-radius-sm)',
                            backgroundColor: 'var(--mantine-color-gray-0)',
                        }}
                    >
                        <Group justify="space-between">
                            <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                                <IconPhoto size={16} />
                                <Text
                                    size="sm"
                                    style={{
                                        flex: 1,
                                        minWidth: 0,
                                        wordBreak: 'break-all',
                                        lineHeight: 1.2
                                    }}
                                    title={currentValue}
                                >
                                    {currentValue}
                                </Text>
                            </Group>
                            <ActionIcon
                                color="red"
                                size="sm"
                                onClick={clearFile}
                                title="Remove file"
                                variant="subtle"
                            >
                                <IconX size={14} />
                            </ActionIcon>
                        </Group>
                    </Box>
                )}

                {/* URL Input Alternative - Only show when no file is selected */}
                {!currentValue && (
                    <TextInput
                        label="Or enter image URL"
                        placeholder="https://example.com/image.jpg"
                        value={typeof value === 'string' ? value : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUrlChange(e.currentTarget.value)}
                        rightSection={
                            <ActionIcon
                                variant="subtle"
                                onClick={openUrlModal}
                                title="Open URL input modal"
                            >
                                <IconUpload size={16} />
                            </ActionIcon>
                        }
                    />
                )}

                {/* Image Preview */}
                {preview && (previewUrl || (value && getImageUrl(value))) && (
                    <Box>
                        <Text size="sm" fw={500} mb="xs">
                            Preview:
                        </Text>
                        <Box
                            style={{
                                border: '1px solid var(--mantine-color-gray-3)',
                                borderRadius: 'var(--mantine-radius-sm)',
                                padding: 'var(--mantine-spacing-xs)',
                                backgroundColor: 'var(--mantine-color-gray-0)',
                            }}
                        >
                            <Image
                                src={previewUrl || (value ? getImageUrl(value) : '') || ''}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--mantine-radius-xs)',
                                }}
                                onError={(e) => {
                                    console.warn('Failed to load image preview:', e);
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {/* Error message */}
                {error && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                        {error}
                    </Alert>
                )}
            </Stack>

            {/* URL Input Modal */}
            <Modal
                opened={urlModalOpened}
                onClose={handleUrlCancel}
                title="Enter Image URL"
                centered
                size="sm"
            >
                <Stack gap="md">
                    <TextInput
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.currentTarget.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                handleUrlSubmit();
                            }
                        }}
                        autoFocus
                    />
                    <Group justify="flex-end" gap="sm">
                        <Button variant="light" onClick={handleUrlCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                            Add URL
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}

interface MultipleFileUploadProps {
    label: string;
    placeholder?: string;
    values?: (string | File)[];
    onChange: (values: (string | File)[]) => void;
    accept?: string;
    error?: string;
    description?: string;
    preview?: boolean;
    required?: boolean;
}

export function MultipleFileUpload({
    label,
    placeholder = 'Select files',
    values = [],
    onChange,
    accept = 'image/*',
    error,
    description,
    preview = true,
    required = false,
}: MultipleFileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    // Helper function to get full image URL
    const getImageUrl = (imageValue: string | File): string | null => {
        if (imageValue instanceof File) {
            return URL.createObjectURL(imageValue);
        }
        // If it's a string and starts with 'uploads/', prepend the API base URL
        if (typeof imageValue === 'string' && imageValue.startsWith('uploads/')) {
            return `${app.apiBaseUrl}/${imageValue}`;
        }
        // If it's already a full URL, return as is
        if (typeof imageValue === 'string' && (imageValue.startsWith('http://') || imageValue.startsWith('https://'))) {
            return imageValue;
        }
        // For other relative paths, prepend the API base URL
        if (typeof imageValue === 'string') {
            return `${app.apiBaseUrl}/${imageValue}`;
        }
        return imageValue;
    };

    // Handle file selection
    const handleFileSelect = (files: File[]) => {
        if (files) {
            onChange([...values, ...files]);
        }
    };

    // Handle drag and drop
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files);
            handleFileSelect(files);
        }
    };

    // Remove file
    const removeFile = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        onChange(newValues);
    };

    // Add URL
    const addUrl = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            onChange([...values, url]);
        }
    };

    return (
        <Stack gap="sm">
            <Text size="sm" fw={500}>
                {label}
                {required && <span style={{ color: 'red' }}> *</span>}
            </Text>

            {description && (
                <Text size="xs" c="dimmed">
                    {description}
                </Text>
            )}

            {/* File Upload Area */}
            <Box
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${dragActive ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-4)'}`,
                    borderRadius: 'var(--mantine-radius-md)',
                    padding: 'var(--mantine-spacing-md)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: dragActive ? 'var(--mantine-color-blue-0)' : 'transparent',
                    transition: 'all 0.2s ease',
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                <Stack gap="sm" align="center">
                    <IconPhoto size={48} color="var(--mantine-color-gray-5)" />
                    <Text size="sm" c="dimmed">
                        {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {accept === 'image/*' ? 'PNG, JPG, JPEG, WebP, GIF up to 100MB each' : 'Any file type'}
                    </Text>
                </Stack>
            </Box>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    if (files.length > 0) {
                        handleFileSelect(files);
                    }
                }}
                style={{ display: 'none' }}
            />

            {/* Add URL button */}
            <Button
                variant="light"
                size="xs"
                leftSection={<IconUpload size={14} />}
                onClick={addUrl}
            >
                Add URL
            </Button>

            {/* File list */}
            {values.length > 0 && (
                <Stack gap="xs">
                    {values.map((file, index) => (
                        <Box
                            key={index}
                            p="sm"
                            style={{
                                border: '1px solid var(--mantine-color-gray-3)',
                                borderRadius: 'var(--mantine-radius-sm)',
                                backgroundColor: 'var(--mantine-color-gray-0)',
                            }}
                        >
                            <Group justify="space-between">
                                <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                                    <IconPhoto size={16} />
                                    <Text
                                        size="sm"
                                        style={{
                                            flex: 1,
                                            minWidth: 0,
                                            wordBreak: 'break-all',
                                            lineHeight: 1.2
                                        }}
                                        title={file instanceof File ? file.name : file}
                                    >
                                        {file instanceof File ? file.name : file}
                                    </Text>
                                </Group>
                                <ActionIcon
                                    color="red"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    title="Remove file"
                                    variant="subtle"
                                >
                                    <IconX size={14} />
                                </ActionIcon>
                            </Group>

                            {/* Image preview */}
                            {preview && (file instanceof File ? file.type.startsWith('image/') : true) && getImageUrl(file) && (
                                <Box
                                    style={{
                                        marginTop: 'var(--mantine-spacing-xs)',
                                        border: '1px solid var(--mantine-color-gray-2)',
                                        borderRadius: 'var(--mantine-radius-xs)',
                                        padding: 'var(--mantine-spacing-xs)',
                                        backgroundColor: 'var(--mantine-color-white)',
                                    }}
                                >
                                    <Image
                                        src={getImageUrl(file) || ''}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--mantine-radius-xs)',
                                        }}
                                        onError={(e) => {
                                            console.warn('Failed to load image preview:', e);
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Stack>
            )}

            {/* Error message */}
            {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                    {error}
                </Alert>
            )}
        </Stack>
    );
}
