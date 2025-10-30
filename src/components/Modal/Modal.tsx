import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalNode = document.getElementById('modal');

export default function Modal({ children, onClose }) {
  document.addEventListener('keydown', handleClose);

  function handleClose(e) {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      document.removeEventListener('keydown', handleClose);
      onClose();
    }
  }
  console.log(children);

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
