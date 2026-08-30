import { useState, useEffect } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import { API_URL } from '../../constants';
import cls from './HomePage.module.scss';

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);

      if (!response.ok) {
        throw new Error('Не удалось загрузить вопросы');
      }

      const questions = await response.json();

      setQuestions(questions);
    } catch (error) {
      setError('Не удалось загрузить вопросы. Попробуйте ещё раз.');
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {error && <div className={cls.error}>{error}</div>}

      {questions.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </>
  );
};
