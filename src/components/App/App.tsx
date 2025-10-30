import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import css from './App.module.css';
import { fetchNotes } from '@/services/noteService';

import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import HeaderButton from '../HeaderButton/HeaderButton';
import Pagination from '../Pagination/Pagination';

function App() {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchNotes(page),
    enabled: true,
    placeholderData: keepPreviousData,
  });
  // console.log(data);

  function openModal() {
    console.log('open modal');
    setModal(true);
  }
  function closeModal() {
    console.log('close modal');
    setModal(false);
  }

  function onPageChange(e) {
    console.log(e);
    setPage(s => e.selected + 1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSubmit={console.log} />
        {isSuccess && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
          />
        )}
        <HeaderButton handleClick={openModal} />
      </header>
      {isSuccess && <NoteList items={data.notes} />}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={console.log} />
        </Modal>
      )}
    </div>
  );
}

export default App;
