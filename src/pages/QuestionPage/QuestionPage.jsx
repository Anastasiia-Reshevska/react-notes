import { useEffect, useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Loader, SmallLoader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import cls from './QuestionPage.module.scss';

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useAuth();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const levelVariant = () => card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
  const comptedVariant = () => card.completed === true ? 'success' : 'warning';

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const question = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    setCard(question);
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: isChecked,
      }),
    });

    const question = await response.json();
    setCard(question);
  });

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  useEffect(() => {
    fetchCard();
  }, [id]);

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={comptedVariant()}>
              {card.completed ? 'Completed' : 'Not completed'}
            </Badge>
            {card?.editDate && (
              <p className={cls.editDate}>Edited {card.editDate}</p>
            )}
          </div>
          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>
          <div className={cls.cardAnswers}>
            <label>short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>
          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardСheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>
          {isAuth && (
            <Button
              onClick={() => navigate(`/editquestion/${card.id}`)}
              isDisabled={isCardUpdating}>
              Edit Question
            </Button>
          )}
          <Button onClick={() => navigate('/')} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
