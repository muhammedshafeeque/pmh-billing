import { useEffect } from 'react';

type KeyHandler = {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  handler: () => void;
};

export const useKeyboardShortcuts = (handlers: KeyHandler[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handlers.forEach(({ key, ctrl, alt, shift, handler }) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          (!ctrl || event.ctrlKey) &&
          (!alt || event.altKey) &&
          (!shift || event.shiftKey)
        ) {
          event.preventDefault();
          handler();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};

// Common keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  SAVE: 'F1',
  PAYMENT: 'F2',
  CUSTOMER_LOOKUP: 'F3',
  CANCEL: 'Escape',
  DELETE: 'Delete',
  NEW: 'F4',
  PRINT: 'F5',
  SEARCH: 'F6',
}; 