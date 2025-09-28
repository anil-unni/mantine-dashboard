# Confirmation Modal Usage Guide

This guide explains how to use the confirmation modal system throughout the application to prevent accidental data loss and provide better user experience.

## Components

### 1. ConfirmationModal Component

A reusable modal component for confirmations with different types and customizable content.

```tsx
import { ConfirmationModal } from '@/components/confirmation-modal';

<ConfirmationModal
  opened={opened}
  onClose={onClose}
  onConfirm={onConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  confirmColor="red"
  type="delete"
  loading={false}
/>
```

### 2. useConfirmationModal Hook

Basic hook for managing confirmation modal state.

```tsx
import { useConfirmationModal } from '@/components/confirmation-modal';

const { openModal, opened, closeModal, confirm, config } = useConfirmationModal();

// Open modal
openModal({
  title: 'Delete Item',
  message: 'Are you sure?',
  onConfirm: () => {
    // Handle confirmation
  },
});
```

### 3. useConfirmation Hook

Convenience hook with pre-configured confirmation types.

```tsx
import { useConfirmation } from '@/hooks/use-confirmation';

const { confirmDelete, confirmWarning, confirmInfo } = useConfirmation();

// Delete confirmation
confirmDelete(
  {
    title: 'Delete News',
    message: 'Are you sure you want to delete this news article?',
  },
  () => {
    // Handle delete
  }
);

// Warning confirmation
confirmWarning(
  {
    title: 'Unsaved Changes',
    message: 'You have unsaved changes. Are you sure you want to leave?',
  },
  () => {
    // Handle navigation
  }
);
```

### 4. useFormNavigationGuard Hook

Hook for protecting forms from accidental navigation when there are unsaved changes.

```tsx
import { useFormNavigationGuard } from '@/hooks/use-form-navigation-guard';

const { handleNavigation } = useFormNavigationGuard({
  hasUnsavedChanges: form.isDirty(),
  message: 'You have unsaved changes. Are you sure you want to leave?',
  title: 'Unsaved Changes',
});

// Use handleNavigation instead of navigate
<Button onClick={() => handleNavigation('/dashboard')}>
  Go to Dashboard
</Button>
```

## Implementation Examples

### Delete Operations

Replace `window.confirm` with confirmation modals:

```tsx
// Before
const handleDelete = (id: string) => {
  if (window.confirm('Are you sure?')) {
    deleteItem(id);
  }
};

// After
const { confirmDelete } = useConfirmation();

const handleDelete = (id: string) => {
  confirmDelete(
    {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
    },
    () => deleteItem(id)
  );
};
```

### Form Navigation Protection

Protect forms from accidental navigation:

```tsx
// In form components
const { handleNavigation } = useFormNavigationGuard({
  hasUnsavedChanges: form.isDirty(),
  message: 'You have unsaved changes. Are you sure you want to leave?',
  title: 'Unsaved Changes',
});

// Replace navigate calls
<Button onClick={() => handleNavigation('/dashboard')}>
  Cancel
</Button>
```

### Data Table Actions

Use confirmation modals in data table action components:

```tsx
import { DataTableActions } from '@/components/data-table/data-table-actions';

<DataTableActions
  onDelete={() => {
    // Delete action will automatically show confirmation modal
  }}
  onEdit={() => {
    // Edit action
  }}
/>
```

## Modal Types

- **delete**: Red color, trash icon, for destructive actions
- **warning**: Orange color, warning icon, for cautionary actions
- **info**: Blue color, info icon, for informational confirmations

## Best Practices

1. **Always use confirmation modals for delete operations** - Never use `window.confirm`
2. **Protect forms with navigation guards** - Prevent accidental data loss
3. **Use appropriate modal types** - Choose the right type for the action
4. **Provide clear messages** - Explain what will happen and consequences
5. **Use loading states** - Show loading during async operations
6. **Consistent styling** - Use the same confirmation patterns throughout the app

## Global Implementation

The confirmation modal system is now implemented across:

- ✅ News list page (delete operations)
- ✅ News edit page (form navigation protection)
- ✅ News create page (form navigation protection)
- ✅ News page configuration (form navigation protection)
- ✅ Data table actions (delete operations)
- ✅ All form navigation buttons

## Future Enhancements

- Add keyboard shortcuts (Enter to confirm, Escape to cancel)
- Add animation transitions
- Add bulk operation confirmations
- Add custom confirmation content support
