import config from "../../config";
import { CommentModel } from "../../types/comment/comment";
import { Result } from "../../types/result/result";
import helpers from "../helpers";

export default async function deleteComment(token: string, comment: CommentModel): Promise<Result> {
  
  const { signal, timeout } = helpers.getAbortSignal();

  try {
    const response = await fetch(`${config.api.comments.url}/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: signal
    });
    
    if (!response.ok) {
      return Result.Fail().WithError({ statusCode: response.status, message: 'Server refused request.'}).WithMessage('Failed to connect to server.');
    }

    return Result.Succeed().WithMessage(`Successfully deleted comment from ${comment.toTitle()}`);
  } catch {
    return Result.Fail().WithMessage('Failed to connect to server.');
  } finally {
    clearTimeout(timeout);
  }
}