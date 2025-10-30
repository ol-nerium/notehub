// https://notehub-public.goit.study/api/docs
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRyYnVybEBnbWFpbC5jb20iLCJpYXQiOjE3NjE4MjY0NTF9.5erC7pY6_BNSlvioQuj0Jdeeth7gCRu6esJufzqzcWs"
// }

const key = import.meta.env.VITE_NOTEHUB_TOKEN;
// console.log(key);
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(page: number) {
  const res = await axios.get('/notes', {
    params: { page: page, perPage: 10 },
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  return res.data;
}

//notehub-public.goit.study/api/notes?search=example&tag=Todo&page=1&perPage=10&sortBy=created

// : має виконувати запит для отримання колекції нотаток із сервера.Повинна підтримувати пагінацію(через параметр сторінки) та фільтрацію за ключовим словом(пошук);
export function createNote(newTodo) {}
// : має виконувати запит для створення нової нотатки на сервері.Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
export function deleteNote(id: number) {}
// : має виконувати запит для видалення нотатки за заданим ідентифікатором.Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
