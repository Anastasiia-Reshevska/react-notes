import { useActionState, useEffect } from 'react';
import { Button } from '../Button';
import { Loader } from '../Loader';
import cls from './QuestionForm.module.scss';

export const QuestionForm = ({
  action,
  submitBtnText,
  clearForm,
  nameQuestion,
  nameAnswer,
  nameDescription,
  nameResources,
  nameLevel,
  idAnswer,
  idQuestion,
  idDescription,
  idResources,
  idLevel,
  colsField,
  rowsField,
  placeholderQuestion,
  placeholderAnswer,
  placeholderDescription,
  placeholderResources,
  rowsDescription,
  initialState = {},
  onPendingChange,
}) => {
  const [formState, formAction, isPending] = useActionState(action, {
    ...initialState,
    clearForm,
  });

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  return (
    <>
      {isPending && <Loader />}
      <form action={formAction} className={cls.form}>
        <input
          type="text"
          name="questionId"
          defaultValue={formState.id}
          hidden
        />
        <div className={cls.formControl}>
          <label htmlFor={idQuestion}>Question: </label>
          <textarea
            defaultValue={formState.question}
            name={nameQuestion}
            id={idQuestion}
            cols={colsField}
            rows={rowsField}
            required
            placeholder={placeholderQuestion}
          />
        </div>
        <div className={cls.formControl}>
          <label htmlFor={idAnswer}>Short answer: </label>
          <textarea
            defaultValue={formState.answer}
            name={nameAnswer}
            id={idAnswer}
            cols={colsField}
            rows={rowsField}
            required
            placeholder={placeholderAnswer}
          />
        </div>
        <div className={cls.formControl}>
          <label htmlFor={idDescription}>Description: </label>
          <textarea
            defaultValue={formState.description}
            name={nameDescription}
            id={idDescription}
            cols={colsField}
            rows={rowsDescription}
            required
            placeholder={placeholderDescription}
          />
        </div>
        <div className={cls.formControl}>
          <label htmlFor={idResources}>Resources: </label>
          <textarea
            defaultValue={formState.resources}
            name={nameResources}
            id={idResources}
            cols={colsField}
            rows={rowsDescription}
            placeholder={placeholderResources}
          />
        </div>
        <div className={cls.formControl}>
          <label htmlFor={idLevel}>Level: </label>
          <select id={idLevel} name={nameLevel} defaultValue={formState.level}>
            <option disabled>Question level</option>
            <option value="1">1 - easiest</option>
            <option value="2">2 - medium</option>
            <option value="3">3 - hardest</option>
          </select>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              type="checkbox"
              id="clearFormField"
              defaultChecked={formState.clearForm}
              name="clearForm"
              className={cls.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>
        </div>
        <Button isDisabled={isPending}>{submitBtnText}</Button>
      </form>
    </>
  );
};
