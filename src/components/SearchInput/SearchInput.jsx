import { useId } from 'react';
import cls from './SearchInput.module.scss';
import { SearchIcon } from '../icons';

export const SearchInput = ({ value, onChange }) => {
  const idInput = useId();
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={idInput}>
        <SearchIcon className={cls.searchIcon} />
      </label>
      <input
        type="text"
        id={idInput}
        className={cls.input}
        placeholder="search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
