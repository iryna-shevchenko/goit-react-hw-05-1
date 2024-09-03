import { Link, useLocation } from 'react-router-dom';

import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(
        ({ id, title, poster, release_date, rating, vote_average }) => (
          <li className={css.item} key={id}>
            <Link className={css.link} to={`/movies/${id}`} state={location}>
              <div className={css.poster}>
                <img src={poster} alt={title} width={236} />
              </div>
              <div className={css.details}>
                <p>
                  {title} ({release_date.split('-')[0]})
                </p>
                <p className={css.rating}>TMDb: {rating}</p>
              </div>
              <p>{vote_average}</p>
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
