import css from './HeaderButton.module.css';

export default function HeaderButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button className={css.button} type="button" onClick={handleClick}>
      Create note +
    </button>
  );
}
