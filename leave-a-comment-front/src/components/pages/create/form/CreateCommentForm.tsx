import * as React from 'react';
import './CreateCommentForm.css'
import { CreateCommentRequest, DEFAULT_CREATE_COMMENT_REQUEST } from '../../../../types/comment/createCommentRequest';
import StandardFormLabeledInput from '../../../forms/standardFormLabeledInput/StandardFormLabeledInput';

interface ICreateCommentFormProps {
  submit: (request: CreateCommentRequest) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function CreateCommentForm(props: ICreateCommentFormProps): JSX.Element | null {

  const [ request, setRequest ] = React.useState<CreateCommentRequest>(DEFAULT_CREATE_COMMENT_REQUEST);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.submit(request)
  }
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setRequest(r => {
      const newValue = {...r};
      newValue[name] = value;
      return newValue;
    });
  }

  return (
    <form className='create-comment-form standard-form' onSubmit={handleSubmit}>
      <StandardFormLabeledInput label={'Name'} name={'name'} value={request.name} handleChange={handleChange} />
      <StandardFormLabeledInput type='textarea' label={'Message'} name={'body'} value={request.body} handleChange={handleChange} />
      <button type='submit' className='standard-button'>Submit</button>
    </form>
  );
}