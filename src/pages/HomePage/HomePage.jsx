import { useEffect, useState } from 'react';
import { getMovies, normalizeMoviesList } from '../../movies-api';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovies();
        const normalizedData = normalizeMoviesList(data);
        setMovies(normalizedData);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <main className={css.content}>
      <div className={css.title}>
        <h1>Trending today</h1>
        <div className={css.loadingError}>
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
        </div>
      </div>
      <MovieList movies={movies} />
    </main>
  );
}
