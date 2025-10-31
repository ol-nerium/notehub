import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBox({
  onSubmit,
}: {
  onSubmit: (query: null | string) => void;
}) {
  const [query, setQuery] = useState('');
  const handleChange = useDebouncedCallback(e => {
    setQuery(e.target.value);
  }, 600);

  useEffect(() => {
    onSubmit(query);
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={handleChange}
    />
  );
}
