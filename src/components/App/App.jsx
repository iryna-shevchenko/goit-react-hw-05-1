import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import SocialNetworkLink from '../SocialNetworkLink/SocialNetworkLink';
import Navigation from '../Navigation/Navigation';
import Logotype from '../Logotype/Logotype';
import Loader from '../Loader/Loader';

import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

export default function App() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.headerWrap}>
          <Logotype />
          <div className={css.socialNavWrap}>
            <Navigation />
            <SocialNetworkLink />
          </div>
        </div>
      </header>

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
