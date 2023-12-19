import * as React from 'react';
import './HomePage.css';
import CommentsFeed from './commentsFeed/CommentsFeed';
import { CommentModel } from '../../../types/comment/comment';
import { SessionContext } from '../../../app/contexts/session/SessionContext';
import api from '../../../api';
import { LoadingSpinnerContext } from '../../../app/contexts/loadingSpinner/LoadingSpinnerContext';
import { Result } from '../../../types/result/result';
import ResultDisplay from '../../resultDisplay/ResultDisplay';

interface IHomePageProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function HomePage(props: IHomePageProps): JSX.Element | null {
  return (
    <main>
      <h1>Comments</h1>
      <CommentsFeed />
    </main>
  );
}

export default HomePage;