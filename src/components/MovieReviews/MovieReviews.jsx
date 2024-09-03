import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews, normalizedReviews } from '../../movies-api';
import { BsPersonCircle } from 'react-icons/bs';
import { RiStarFill } from 'react-icons/ri';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { results } = await getReviews(movieId);
        const data = normalizedReviews(results);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  const toggleExpand = idx => {
    setExpandedIdx(idx === expandedIdx ? null : idx);
  };

  return (
    <div className={css.content}>
      <div className={css.loadingError}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
      </div>
      <div>
        {!error && !isLoading && (
          <div className={css.info}>
            <h2>Reviews</h2>
            <ul className={css.list}>
              {reviews && reviews.length ? (
                reviews.map(({ id, author, content, avatar, rating }, idx) => {
                  const truncatedContent =
                    content.length > 150
                      ? content.slice(0, 150) + ' ...'
                      : content;

                  return (
                    <li className={css.item} key={id}>
                      <div className={css.containerAvatar}>
                        {avatar && !avatar.endsWith('null') ? (
                          <img
                            className={css.avatar}
                            src={avatar}
                            alt={author}
                            width="50"
                            height="50"
                          />
                        ) : (
                          <div className={css.defaultAvatar}>
                            <BsPersonCircle size={50} color="#20bcc6" />
                          </div>
                        )}
                        <div className={css.containerAuthor}>
                          <h3 className={css.titleAuthor}>
                            A review by
                            <span className={css.authorName}> {author}</span>
                          </h3>
                          <div className={css.ratingAuthor}>
                            <RiStarFill color="#cccc00" size={16} />
                            <p>{rating}</p>
                          </div>
                        </div>
                      </div>
                      <p onClick={() => toggleExpand(idx)}>
                        {idx === expandedIdx ? content : truncatedContent}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p className={css.noReviews}>There are no reviews yet.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
