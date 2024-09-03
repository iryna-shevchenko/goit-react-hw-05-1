import AdditionalNav from '../AdditionalNav/AdditionalNav';
import BackLink from '../BackLink/BackLink';

import css from './MovieDetails.module.css';

export default function MovieDetails({
  movie: {
    title,
    poster,
    rating,
    vote_count,
    tagline,
    countries,
    genres,
    runtime,
    release_date,
    budget,
    revenue,
    overview,
  },
}) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const formattedDate = release_date.split('-').reverse().join('.');
  const formattedBudget = budget.toLocaleString().replace(/\s/g, '.');
  const formattedRevenue = revenue.toLocaleString().replace(/\s/g, '.');

  return (
    <div className={css.content}>
      <BackLink />
      <div className={css.movieDetails}>
        <img className={css.poster} src={poster} alt={title} />
        <div className={css.info}>
          <div>
            <h1 className={css.title}>
              {title}
              {release_date && <> ({new Date(release_date).getFullYear()})</>}
            </h1>
            <div className={css.listDetails}>
              <ul className={css.listTitle}>
                <li>TMDB Rating:</li>
                <li>Tagline:</li>
                <li>Countries:</li>
                <li>Genres:</li>
                <li>Runtime:</li>
                <li>Release date:</li>
                <li>Budget:</li>
                <li>Revenue:</li>
                <li>Overview:</li>
              </ul>
              <ul className={css.listText}>
                <li>
                  {rating} ({vote_count} votes)
                </li>
                <li>{tagline ? `"${tagline}"` : '-'}</li>
                <li>{countries}</li>
                <li>{genres}</li>
                <li>{`${hours}h ${minutes}m`}</li>
                <li>{formattedDate}</li>
                <li>{formattedBudget ? `${formattedBudget} $` : '-'}</li>
                <li>{formattedRevenue ? `${formattedRevenue} $` : '-'}</li>
                <li>{overview}</li>
              </ul>
            </div>
          </div>
          <div>
            <AdditionalNav />
          </div>
        </div>
      </div>
    </div>
  );
}
