import * as React from 'react';
import { DEFAULT_SESSION, Session, SessionStatus } from '../../../types/session/session';
import { LoadingSpinnerContext } from '../loadingSpinner/LoadingSpinnerContext';
import api from '../../../api';

interface ISessionProviderProps {
  children: React.ReactNode
}

interface ISessionContextState {
  session: Session,
  login: (token: string | undefined) => void,
  logout: () => void
}

const LOCAL_STORAGE_TOKEN_KEY = "token";

export const SessionContext = React.createContext<ISessionContextState>({ session: DEFAULT_SESSION, login: () => {}, logout: () => {} });
export function SessionProvider (props: ISessionProviderProps) {
  const [ session, setSession ] = React.useState<Session>(DEFAULT_SESSION);

  const { setLoading } = React.useContext(LoadingSpinnerContext);

  React.useEffect(() => {
    (async function automaticallyLoginOnMount() {
      const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (token == null) {
        setSession({ status: SessionStatus.LOGGED_OUT });
        return;
      };
      setLoading(true);
      const result = await api.session.verifyToken(token);
      setLoading(false);
      if (result.wasSuccess) {
        login(token);
      } else {
        logout();
      }
    })();
  }, []);

  const login = (token: string | undefined) => {
    if (token == null) return;
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    setSession({
      status: SessionStatus.LOGGED_IN,
      token: token
    });
  }

  const logout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setSession({
      status: SessionStatus.LOGGED_OUT,
      token: undefined
    });
  }
  
  return (
    <SessionContext.Provider value={{ session, login, logout }} >
      { props.children }
    </SessionContext.Provider>
  );
}