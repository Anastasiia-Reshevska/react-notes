import { memo } from 'react';
import cls from './QuestionCardList.module.scss';
import { QuestionCard } from '../QuestionCard';

export const QuestionCardList = memo(({ cards, error }) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
});
