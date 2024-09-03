import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearch, normalizeMoviesList } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import BackLink from '../../components/BackLink/BackLink';

import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fromParams = searchParams.get('search');

  useEffect(() => {
    async function getData() {
      if (fromParams === null) return;

      try {
        setIsLoading(true);
        const {
          data: { results },
        } = await getSearch(fromParams);

        if (!results.length) {
          toast.custom(
            <p className={css.toast}>
              There are no movies by this search, try another title
            </p>
          );
        }

        const data = normalizeMoviesList(results);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [fromParams, searchParams]);

  const onChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search?.value;
    if (!value || value.trim() === '') {
      toast.custom(<p className={css.toast}>Enter title of movie to search</p>);
      return;
    }
    setSearch(value.toLowerCase().trim());
    setSearchParams({ search: value.toLowerCase().trim() });
    setSearch('');
  };

  return (
    <main className={css.content}>
      <div className={css.head}>
        <div className={css.backLink}>
          <BackLink />
        </div>
        <div className={css.searchForm}>
          <SearchForm
            value={search}
            onChange={onChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      {movies.length > 0 && fromParams && fromParams.trim() && (
        <div className={css.movieList}>
          <div className={css.searchContainer}>
            <p className={css.searchResult}>
              Search result:{' '}
              <span className={css.spanText}>
                {fromParams.charAt(0).toUpperCase() + fromParams.slice(1)}
              </span>
            </p>
            <div className={css.loadingError}>
              {isLoading && <Loader />}
              {error && <ErrorMessage />}
            </div>
          </div>
          <MovieList movies={movies} />
        </div>
      )}
      <Toaster />
    </main>
  );
}
