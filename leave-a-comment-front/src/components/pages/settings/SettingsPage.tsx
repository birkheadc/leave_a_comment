import * as React from 'react';
import './SettingsPage.css'

interface ISettingsPageProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function SettingsPage(props: ISettingsPageProps): JSX.Element | null {
  return (
    <main className='settings-page-wrapper'>
      <h1>Settings</h1>
    </main>
  );
}