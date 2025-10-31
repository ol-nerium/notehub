import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import React, { useEffect } from 'react';

const modalNode = document.getElementById('modal') as HTMLDivElement;

export default function Modal({
  children,
  onClose,
}: {
  children: any;
  onClose: () => void;
}) {
  function handleEscapeClose(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={handleClose}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalNode
  );
}
