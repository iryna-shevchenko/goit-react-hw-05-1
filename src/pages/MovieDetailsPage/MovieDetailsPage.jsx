import { Suspense, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getMoviesById, objectMovie } from '../../movies-api';

import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import AdditionalNav from '../../components/AdditionalNav/AdditionalNav';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getMoviesById(movieId);
        const objectData = objectMovie(data);
        setMovie(objectData);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <main className={css.content}>
      <div className={css.title}>
        <div className={css.loadingError}>
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
        </div>
      </div>
      {!error && !isLoading && <MovieDetails movie={movie} />}
      {!error && !isLoading && <AdditionalNav /> && (
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      )}
    </main>
  );
}
