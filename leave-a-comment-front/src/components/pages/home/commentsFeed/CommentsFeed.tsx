import * as React from 'react';
import './CommentsFeed.css'
import { CommentModel } from '../../../../types/comment/comment';
import CommentDisplay from './commentDisplay/CommentDisplay';
import { Result } from '../../../../types/result/result';
import { LoadingSpinnerContext } from '../../../../app/contexts/loadingSpinner/LoadingSpinnerContext';
import api from '../../../../api';
import { SessionContext } from '../../../../app/contexts/session/SessionContext';
import ResultDisplay from '../../../resultDisplay/ResultDisplay';

interface ICommentsFeedProps {
  
}

/**
*
* @returns {JSX.Element | null}
*/
export default function CommentsFeed(props: ICommentsFeedProps): JSX.Element | null {

  const [ comments, setComments ] = React.useState<CommentModel[] | undefined>(undefined);

  const [ recentResult, setRecentResult ] = React.useState<Result | undefined>(undefined);

  const { session, logout } = React.useContext(SessionContext);
  const { isLoading, setLoading } = React.useContext(LoadingSpinnerContext);

  React.useEffect(() => {
    (async function fetchComments() {
      if (session.token == null) {
        logout();
        return;
      }
      setLoading(true);
      const result = await api.comments.getAllComments(session.token);
      console.log(result);
      setRecentResult(result);
      if (result.wasSuccess && result.body != null) {
        setComments(result.body);
      }
      setLoading(false);
    })();
  }, []);

  const deleteComment = async (comment: CommentModel) => {
    if (session.token == null) {
      logout();
      return;
    }
    setLoading(true);
    const result = await api.comments.deleteComment(session.token, comment);
    setRecentResult(result);
    if (result.wasSuccess) {
      setComments(c => {
        const newValue = c ? [...c] : [];
        return newValue.filter(c => c.id !== comment.id);
      });
    }
    setLoading(false);
  }
  
  return (
    <div className='comments-feed-wrapper'>
      <ResultDisplay result={recentResult} displayErrors/>
      { comments && ( comments.length > 0 &&
          comments.map(
            comment =>
            <CommentDisplay key={`comment-display-${comment.id}`} comment={comment} delete={deleteComment} />
      ) || <span className='center'>No Comments Were Loaded!</span>)        
      }
    </div>
  );
}