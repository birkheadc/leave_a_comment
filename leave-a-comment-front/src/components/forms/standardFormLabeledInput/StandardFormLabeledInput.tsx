import * as React from 'react';
import './StandardFormLabeledInput.css'

interface IStandardFormLabeledInputProps {
  label: string,
  name: string,
  value: string,
  type?: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function StandardFormLabeledInput(props: IStandardFormLabeledInputProps): JSX.Element | null {
  return (
    <div className='standard-form-labeled-input-wrapper'>
      <label htmlFor={props.name}>{props.label}</label>
      {props.type && props.type === 'textarea'
        ? <textarea rows={5} cols={40} id={props.name} name={props.name} value={props.value} onChange={props.handleChange}></textarea>
        : <input id={props.name} name={props.name} type={props.type || 'text'} value={props.value} onChange={props.handleChange}></input>
      }
    </div>
  );
}