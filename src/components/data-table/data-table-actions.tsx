import {
  PiTrashDuotone as DeleteIcon,
  PiPencilDuotone as EditIcon,
  PiClockCounterClockwiseDuotone as RestoreIcon,
  PiEyeDuotone as ShowIcon,
} from 'react-icons/pi';
import { ActionIcon, Group, GroupProps, Tooltip } from '@mantine/core';
import { useConfirmationModal } from '@/components/confirmation-modal';

export interface DataTableActionsProps extends GroupProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  gap?: string | number;
  justify?: string;
  wrap?: string;
  children?: React.ReactNode;
}

export function DataTableActions({
  gap = 'xs',
  justify = 'right',
  wrap = 'nowrap',
  onEdit,
  onView,
  onDelete,
  onRestore,
  children,
  ...props
}: DataTableActionsProps) {
  const { openModal } = useConfirmationModal();

  const handleDelete = () => {
    if (onDelete) {
      openModal({
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        type: 'delete',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        confirmColor: 'red',
        onConfirm: onDelete,
      });
    }
  };
  return (
    <Group gap={gap} justify={justify} wrap={wrap} {...props}>
      {onView && (
        <Tooltip label="Show">
          <ActionIcon variant="default" onClick={onView}>
            <ShowIcon size="1rem" />
          </ActionIcon>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip label="Edit">
          <ActionIcon variant="default" onClick={onEdit}>
            <EditIcon size="1rem" />
          </ActionIcon>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip label="Delete">
          <ActionIcon variant="default" onClick={handleDelete}>
            <DeleteIcon size="1rem" />
          </ActionIcon>
        </Tooltip>
      )}

      {onRestore && (
        <Tooltip label="Restore">
          <ActionIcon variant="default" onClick={onRestore}>
            <RestoreIcon size="1rem" />
          </ActionIcon>
        </Tooltip>
      )}

      {children}
    </Group>
  );
}
