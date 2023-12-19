import * as React from 'react';
import './CommentDisplay.css'
import { CommentModel } from '../../../../../types/comment/comment';

interface ICommentDisplayProps {
  comment: CommentModel,
  delete: (comment: CommentModel) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function CommentDisplay(props: ICommentDisplayProps): JSX.Element | null {

  const comment = props.comment;

  const handleDelete = () => {
    const confirm = window.confirm(`Really delete comment from ${comment.toTitle()}`);
    if (confirm) props.delete(comment);
  }

  return (
    <div className='comment-display-wrapper'>
      <div className="comment-display-contents">
        <span className='comment-display-title'>From <span className="heavy">{comment.name}</span> # <span className="heavy">{comment.site}</span> @ {new Date(comment.date).toLocaleString()}</span>
        <span className='comment-display-body'>{comment.body}</span>
      </div>
      <div className='comment-display-controls'>
        <button className='standard-button' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}