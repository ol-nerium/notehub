import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: () => void;
}) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      onPageChange={onPageChange}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
