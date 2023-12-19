import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../../components/pages/home/HomePage';
import { SessionContext } from '../contexts/session/SessionContext';
import { SessionStatus } from '../../types/session/session';
import LogoutPage from '../../components/pages/logout/LogoutPage';
import LoginPage from '../../components/pages/login/LoginPage';
import CreatePage from '../../components/pages/create/CreatePage';
import LoadingPage from '../../components/pages/loading/LoadingPage';
import SettingsPage from '../../components/pages/settings/SettingsPage';

interface IAppRoutesProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
export default function AppRoutes(props: IAppRoutesProps): JSX.Element | null {

  const { session } = React.useContext(SessionContext);

  if (session.status === SessionStatus.CHECKING) {
    return (
      <Routes>
        <Route path='*' element={<LoadingPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      { session.status === SessionStatus.LOGGED_IN
      ? LoggedInRoutes
      : LoggedOutRoutes
      }
      { CommonRoutes }
    </Routes>
  );
}

const LoggedInRoutes = (
  <>
    <Route path='/' element={<HomePage />} />
    <Route path='/logout' element={<LogoutPage />} />
    <Route path='/settings' element={<SettingsPage />} />
    <Route path='*' element={<Navigate replace={true} to='/' />} />
  </>
);

const LoggedOutRoutes = (
  <>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/' element={<Navigate replace={true} to='/create' />} />
    <Route path='*' element={<Navigate replace={true} to='/login' />} />
  </>
);

const CommonRoutes = (
  <>
    <Route path='/create' element={<CreatePage />} />
  </>
)