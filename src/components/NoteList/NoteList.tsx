import toast from 'react-hot-toast';

import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/services/noteService';

export default function NoteList({ items }: { items: Note[] }) {
  const queryClient = useQueryClient();
  const removeNote = useMutation({
    mutationFn: deleteNote,
    onSuccess: _ => {
      toast.success('note successfully removed!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      toast.error(`something is wrong( error ${error.message}`);
    },
  });

  const handleDeleteNote = (id: string) => {
    removeNote.mutate(id);
  };

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
                onClick={() => handleDeleteNote(id)}
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
