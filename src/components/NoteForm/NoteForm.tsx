import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import css from './NoteForm.module.css';
import { createNote } from '@/services/noteService';
import type { NoteFormValues } from '@/types/note';
import toast from 'react-hot-toast';

const NoteFormSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimal length of title is 3')
    .max(50, 'Max length of title is 50')
    .required('Title is required'),
  content: Yup.string().max(500, 'Max lenght of content is 500'),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const addNote = useMutation({
    mutationFn: createNote,
    onSuccess: _ => {
      toast.success('Note added successfully');

      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      toast.error(`something is wrong( error ${error.message}`);
    },
  });

  function onSubmit(
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) {
    addNote.mutate(values);
    actions.resetForm();
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field
            as="input"
            type="text"
            id="title"
            className={css.input}
            name="title"
          />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            rows={8}
            name="content"
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" className={css.select} name="tag" id="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
