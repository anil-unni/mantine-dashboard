import { useConfirmationModal } from '@/components/confirmation-modal';

export interface ConfirmationOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  type?: 'delete' | 'warning' | 'info';
}

export function useConfirmation() {
  const { openModal, opened, closeModal, confirm, config } = useConfirmationModal();

  const confirmDelete = (options: ConfirmationOptions, onConfirm: () => void) => {
    openModal({
      ...options,
      type: 'delete',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      confirmColor: 'red',
      onConfirm,
    });
  };

  const confirmWarning = (options: ConfirmationOptions, onConfirm: () => void) => {
    openModal({
      ...options,
      type: 'warning',
      confirmLabel: 'Continue',
      cancelLabel: 'Cancel',
      confirmColor: 'orange',
      onConfirm,
    });
  };

  const confirmInfo = (options: ConfirmationOptions, onConfirm: () => void) => {
    openModal({
      ...options,
      type: 'info',
      confirmLabel: 'OK',
      cancelLabel: 'Cancel',
      confirmColor: 'blue',
      onConfirm,
    });
  };

  return {
    confirmDelete,
    confirmWarning,
    confirmInfo,
    opened,
    closeModal,
    confirm,
    config,
  };
}
