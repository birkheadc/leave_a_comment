import * as React from 'react';
import './ResultDisplay.css'
import { Result, ResultError } from '../../types/result/result';

interface IResultDisplayProps {
  result: Result | undefined,
  displayErrors?: boolean
}

/**
*
* @returns {JSX.Element | null}
*/
export default function ResultDisplay(props: IResultDisplayProps): JSX.Element | null {
  if (props.result == null) return null;
  return (
    <div className={`${props.result.wasSuccess ? 'success' : 'error'} result-display-wrapper`}>
      <span className={'center result-display-title'}>{props.result.wasSuccess ? (props.result.message || 'Success') : ( props.result.message || 'Error')}</span>
      {props.displayErrors && <ResultDisplayErrors errors={props.result.errors} />}
    </div>
  );
}

function ResultDisplayErrors(props: { errors: ResultError[] }): JSX.Element {
  return (
    <ul className='result-display-errors-list'>
      {props.errors.map(
        (error, index) =>
        <li key={`result-display-error-${index}`}>{error.message}</li>
      )}
    </ul>
  );
}