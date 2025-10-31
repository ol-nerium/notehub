// https://notehub-public.goit.study/api/docs
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRyYnVybEBnbWFpbC5jb20iLCJpYXQiOjE3NjE4MjY0NTF9.5erC7pY6_BNSlvioQuj0Jdeeth7gCRu6esJufzqzcWs"
// }

const key = import.meta.env.VITE_NOTEHUB_TOKEN;
import type { NoteFormValues } from '@/types/note';
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;

//notehub-public.goit.study/api/notes?search=example&tag=Todo&page=1&perPage=10&sortBy=created
// : має виконувати запит для отримання колекції нотаток із сервера.Повинна підтримувати пагінацію(через параметр сторінки) та фільтрацію за ключовим словом(пошук);
export async function fetchNotes(page: number, query: null | string) {
  const res = await axios.get('/notes', {
    params: { page: page, perPage: 10, search: query },
  });

  return res.data;
}

// : має виконувати запит для створення нової нотатки на сервері.Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
export async function createNote(newNote: NoteFormValues) {
  const res = await axios.post('/notes', newNote);
  return res.data;
}

// : має виконувати запит для видалення нотатки за заданим ідентифікатором.Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
export async function deleteNote(id: string) {
  const res = await axios.delete(`/notes/${id}`);
  return res.data;
}
