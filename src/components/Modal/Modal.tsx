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
  function handleClose(e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) {
    console.log(e.type);
    if (e.target === e.currentTarget && e.type === 'click') onClose();
    if (e.type === 'keydown') {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.code === 'Escape') {
        onClose();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalNode
  );
}
