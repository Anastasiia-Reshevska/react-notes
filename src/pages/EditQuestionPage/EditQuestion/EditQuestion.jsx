import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetch } from '../../../hooks/useFetch';
import { delayFn } from '../../../helpers/delayFn';
import { dateFormat } from '../../../helpers/dateFormat';
import { QuestionForm } from '../../../components/QuestionForm';
import { Loader } from '../../../components/Loader';
import { API_URL } from '../../../constants';
import cls from './EditQuestion.module.scss';
export const EditQuestion = ({ question }) => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const editCardAction = async (prevState, formData) => {
    try {
      await delayFn();
      const newItem = Object.fromEntries(formData);
      const newResources = newItem.resources.trim();
      const questionId = newItem.questionId;
      const isClearForm = newItem.clearForm;

      const response = await fetch(`${API_URL}/react/${questionId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          question: newItem.question,
          answer: newItem.answer,
          description: newItem.description,
          resources: newResources.length ? newResources.split(',') : [],
          level: Number(newItem.level),
          completed: false,
          editDate: dateFormat(new Date()),
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const item = await response.json();
      toast.success('The question is edited succesfully!');

      return {
        clearForm: isClearForm,
        question: isClearForm ? '' : item.question,
        answer: isClearForm ? '' : item.answer,
        description: isClearForm ? '' : item.description,
        resources: isClearForm ? '' : item.resources.join(', '),
        level: isClearForm ? '' : item.level,
      };
    } catch (error) {
      toast.error(error.message);
      return prevState;
    }
  };

  const [removeQuestion, isQuestionRemoving] = useFetch(async (questionId) => {
    await fetch(`${API_URL}/react/${questionId}`, {
      method: 'DELETE',
    });

    toast.success('The question has been successfuly removed!');
    navigate('/');
  });

  const onRemoveQuestionHandler = (questionId) => {
    const isRemove = confirm('Are you sure');
    isRemove && removeQuestion(questionId);
  };

  return (
    <>
      <h1 className={cls.formTitle}>Edit question</h1>
      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          disabled={isPending}
          onClick={() => onRemoveQuestionHandler(question.id)}>
        </button>
        <QuestionForm
          action={editCardAction}
          submitBtnText="Edit question"
          clearForm={false}
          nameQuestion="question"
          nameAnswer="answer"
          nameDescription="description"
          nameResources="resources"
          nameLevel="level"
          idQuestion="questionField"
          idAnswer="answerField"
          idDescription="descriptionField"
          idResources="resourcesField"
          idLevel="levelField"
          colsField="30"
          rowsField="2"
          rowsDescription="5"
          placeholderQuestion="please enter a question"
          placeholderAnswer="please enter a short answer"
          placeholderDescription="please enter a full description"
          placeholderResources="please enter resources separated by commas"
          initialState={question}
          onPendingChange={setIsPending}
        />
      </div>

      {isQuestionRemoving && <Loader />}
    </>
  );
};
