import { useId } from 'react';

import css from './NoteForm.module.css';

export default function NoteForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" className={css.input} name="title" />
        <span name="title" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          className={css.textarea}
        />
        <span name="content" className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select className={css.select} name="tag" id="tag">
          <option value="todo">Todo</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="meeting">Meeting</option>
          <option value="shopping">Shopping</option>
        </select>
        <span name="tag" className={css.error} />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
