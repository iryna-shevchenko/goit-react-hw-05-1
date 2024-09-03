import { useEffect, useState } from 'react';
import { getCast, normalizedCast } from '../../movies-api';
import { useParams } from 'react-router-dom';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { cast } = await getCast(movieId);
        const data = normalizedCast(cast);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.content}>
      <div className={css.loadingError}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
      </div>
      {!error && !isLoading && (
        <div className={css.info}>
          <h2>Top cast</h2>
          <ul className={css.list}>
            {cast && cast.length ? (
              cast.map(({ id, character, name, photo }) => (
                <li className={css.item} key={id}>
                  <img className={css.photo} src={photo} alt={name} />
                  <div>
                    <h3 className={css.itemTitle}>{name}</h3>
                    <p className={css.itemText}>{character}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className={css.noCasts}>
                We don&#39;t have any cast added to this movie.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
