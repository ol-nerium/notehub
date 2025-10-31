import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import css from './App.module.css';
import { fetchNotes } from '@/services/noteService';

import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import HeaderButton from '../HeaderButton/HeaderButton';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<null | string>(null);
  const [modal, setModal] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes(page, query),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const openModal = useCallback(() => {
    setModal(true);
  }, [modal]);

  const closeModal = useCallback(() => {
    setModal(false);
  }, [modal]);

  function onPageChange(e: { selected: number }) {
    setPage(e.selected + 1);
  }

  function handleSearch(query: null | string) {
    setPage(1);
    setQuery(query);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSubmit={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
          />
        )}
        <HeaderButton handleClick={openModal} />
      </header>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage text={`Sorry! Something went wrong! ${error.message}`} />
      )}
      {/* // move to another file */}
      {isSuccess && data.notes.length > 0 && <NoteList items={data.notes} />}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}

export default App;
