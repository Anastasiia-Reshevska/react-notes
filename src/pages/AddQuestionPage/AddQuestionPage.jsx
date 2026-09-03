import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';
import { Form } from '../../components/Form';
import { API_URL } from '../../constants';
import cls from './AddQuestionPage.module.scss';

const createCardAction = async (prevState, formData) => {
  try {
    await delayFn();
    const newItem = Object.fromEntries(formData);
    const newResources = newItem.resources.trim();
    const isClearForm = newItem.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: 'POST',
      body: JSON.stringify({
        question: newItem.question,
        answer: newItem.answer,
        description: newItem.description,
        resources: newResources.length ? newResources.split(',') : [],
        level: Number(newItem.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const item = await response.json();
    toast.success('New question is succesfully created!');

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
export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <Form
          action={createCardAction}
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
          rowsDecription="5"
          placeholderQuestion="please enter a question"
          placeholderAnswer="please enter a short answer"
          placeholderDescription="please enter a full description"
          placeholderResources="please enter resources separated by commas"
        />
      </div>
    </>
  );
};
