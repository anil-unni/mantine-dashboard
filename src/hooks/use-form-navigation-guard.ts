import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useConfirmationModal } from '@/components/confirmation-modal';

interface UseFormNavigationGuardProps {
  hasUnsavedChanges: boolean;
  message?: string;
  title?: string;
}

export function useFormNavigationGuard({
  hasUnsavedChanges,
  message = 'You have unsaved changes. Are you sure you want to leave?',
  title = 'Unsaved Changes',
}: UseFormNavigationGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, opened, closeModal, confirm } = useConfirmationModal();
  const pendingNavigation = useRef<string | null>(null);

  // Handle browser back/forward and page refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, message]);

  // Handle programmatic navigation
  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges) {
      pendingNavigation.current = path;
      openModal({
        title,
        message,
        type: 'warning',
        confirmLabel: 'Leave',
        cancelLabel: 'Stay',
        onConfirm: () => {
          navigate(path);
        },
      });
    } else {
      navigate(path);
    }
  };

  return {
    handleNavigation,
    hasUnsavedChanges,
    confirmationModal: {
      opened,
      closeModal,
      confirm,
    },
  };
}
