import * as React from 'react';
import './CreatePage.css'
import CreateCommentForm from './form/CreateCommentForm';
import ResultDisplay from '../../resultDisplay/ResultDisplay';
import { Result } from '../../../types/result/result';
import { LoadingSpinnerContext } from '../../../app/contexts/loadingSpinner/LoadingSpinnerContext';
import { CreateCommentRequest } from '../../../types/comment/createCommentRequest';
import api from '../../../api';

interface ICreatePageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function CreatePage(props: ICreatePageProps): JSX.Element | null {

  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);
  const { setLoading } = React.useContext(LoadingSpinnerContext);

  const submit = async (request: CreateCommentRequest) => {
    setLoading(true);
    const result = await api.comments.createComment(request);
    setRecentResult(result);
    setLoading(false);
  }

  return (
    <main className='create-page-wrapper'>
      <h1>Create Comment</h1>
      <ResultDisplay result={recentResult} />
      <CreateCommentForm submit={submit} />
    </main>
  );
}