import config from "../../config";
import { LoginCredentials } from "../../types/credentials/loginCredentials";
import { Result } from "../../types/result/result";
import helpers from "../helpers";

export default async function login(credentials: LoginCredentials): Promise<Result<string>> {
  const { signal, timeout } = helpers.getAbortSignal();

  try {
    const response = await fetch(config.api.authentication.url, {
      method: 'POST',
      headers: {
        'Authorization': encodeCredentials(credentials)
      },
      signal: signal
    });
    if (!response.ok) {
      return Result.Fail().WithError({ statusCode: response.status, message: 'Server refused request.' }).WithMessage('Failed to connect to server.');
    }
    const data = await response.text();
    return Result.Succeed().WithBody(data).WithMessage('Logged in successfully.');
  } catch {
    return Result.Fail().WithMessage('Failed to connect to server.');
  } finally {
    clearTimeout(timeout);
  }
}

function encodeCredentials(credentials: LoginCredentials): string {
  const code = window.btoa(`${credentials.username}:${credentials.password}`);
  return `Basic ${code}`;
}