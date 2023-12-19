import * as React from 'react';
import ReactModal from 'react-modal';
import LoadingSpinner from './LoadingSpinner';

interface ILoadingSpinnerProviderProps {
  children: React.ReactNode
}

interface ILoadingSpinnerContextState {
  isLoading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingSpinnerContext = React.createContext<ILoadingSpinnerContextState>({ isLoading: false, setLoading: () => {} });
export function LoadingSpinnerProvider (props: ILoadingSpinnerProviderProps) {
  const [ isLoading, setLoading ] = React.useState<boolean>(false);
  return (
    <LoadingSpinnerContext.Provider value={{ isLoading, setLoading }}>
      <ReactModal className={'loading-spinner-modal-wrapper'} isOpen={isLoading}>
        <LoadingSpinner />
      </ReactModal>
      { props.children }
    </LoadingSpinnerContext.Provider>
  )
}