import { useMemo } from 'react';
import cls from './Pagination.module.scss';
import { Button } from '../Button';

export const Pagination = ({ pages, activePage, onPageChange }) => {
  const pagination = useMemo(() => {
    return Array(pages)
      .fill(0)
      .map((_, i) => i + 1);
  }, [pages]);

  return (
    <div className={cls.paginationContainer}>
      {pagination.map((value) => (
        <Button
          key={value}
          isActive={value === activePage}
          onClick={() => onPageChange(value)}>
          {value}
        </Button>
      ))}
    </div>
  );
};
