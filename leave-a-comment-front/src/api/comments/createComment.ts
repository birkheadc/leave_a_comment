import config from "../../config";
import { CreateCommentRequest } from "../../types/comment/createCommentRequest";
import { Result } from "../../types/result/result";
import helpers from "../helpers";

export default async function createComment(request: CreateCommentRequest): Promise<Result> {
  request.site = "localhost";
  
  const { signal, timeout } = helpers.getAbortSignal();

  try {
    const response = await fetch(config.api.comments.url, {
      method: 'POST',
      signal: signal,
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      return Result.Fail().WithError({ statusCode: response.status, message: 'Server refused request'}).WithMessage('Failed to connect to server.');
    }
    return Result.Succeed().WithMessage('Successfully created comment.');
  } catch {
    return Result.Fail().WithMessage('Failed to connect to server.');
  } finally {
    clearTimeout(timeout);
  }
}