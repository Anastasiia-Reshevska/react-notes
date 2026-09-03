import { useState, useEffect, useRef, useMemo } from 'react';
import { API_URL } from '../../constants';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';
import { FilterSelect } from '../../components/FilterSelect';
import { Pagination } from '../../components/Pagination';

import cls from '../HomePage/HomePage.module.scss';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [sortSelectValue, setSortSelectValue] = useState('');
  const [countSelectValue, setCountSelectValue] = useState('');

  const controlsContainerRef = useRef();

  const getActivePageNumber = () =>
    questions.next === null ? questions.last : questions.next - 1;

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    if (!questions?.data?.length) {
      return [];
    }

    if (searchValue.trim()) {
      return questions.data.filter((d) =>
        d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );
    }

    return questions.data;
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestions(`react?${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  const paginationHandler = (page) => {
    setSearchParams(
      `_page=${page}&_per_page=${countSelectValue || DEFAULT_PER_PAGE}&${sortSelectValue}`,
    );

    controlsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  return (
    <>
      {!isLoading && (
        <div className={cls.controlsContainer} ref={controlsContainerRef}>
          <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
          <FilterSelect
            value={sortSelectValue}
            onChange={onSortSelectChangeHandler}
            valueCount={countSelectValue}
            onChangeCount={onCountSelectChangeHandler}
          />
        </div>
      )}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {!isLoading && cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No notes...</p>
      ) : (
        questions?.pages > 1 && (
          <Pagination
            pages={questions?.pages || 0}
            activePage={getActivePageNumber()}
            onPageChange={paginationHandler}
          />
        )
      )}
    </>
  );
};
