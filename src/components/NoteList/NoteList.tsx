import type { Note } from '@/types/note';
import css from './NoteList.module.css';

export default function NoteList({ items }) {
  return (
    <ul className={css.list}>
      {items.map((i: Note) => {
        const { content, id, tag, title } = i;
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button
                className={css.button}
                onClick={() => console.log('delete todo')}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
