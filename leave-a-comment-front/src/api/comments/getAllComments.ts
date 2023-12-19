import config from "../../config";
import { CommentModel } from "../../types/comment/comment";
import { Result } from "../../types/result/result";
import helpers from "../helpers";

export default async function getAllComments(token: string): Promise<Result<CommentModel[]>> {
  
  const { signal, timeout } = helpers.getAbortSignal();

  try {
    const response = await fetch(config.api.comments.url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: signal
    });
    if (!response.ok) {
      return Result.Fail().WithError({ statusCode: response.status, message: 'Server refused request.' }).WithMessage('Failed to connect to server.');
    }
    const data = await response.json();
    const comments = CommentModel.arrayFromJson(data);
    return Result.Succeed().WithBody(comments).WithMessage('Successfully retrieved comments from server.');
  } catch {
    return Result.Fail().WithMessage('Failed to connect to server.');
  } finally {
    clearTimeout(timeout);
  }


  // return Result.Succeed().WithBody(mockData).WithMessage('Comments loaded successfully.');
  // return Result.Fail().WithError({ message: "Not yet implemented" });
}