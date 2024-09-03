import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '6d13047124a1d6ed0956d7bd51e8df7f';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDEzMDQ3MTI0YTFkNmVkMDk1NmQ3YmQ1MWU4ZGY3ZiIsInN1YiI6IjY1ZTc3YmRjZmRjNGZhMDE4NTJhMzk4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pgLLnLp-len-7_B6OCwq1dsy4a1ar9R6lqlFJ_DMvOc';

const imageTMDB = 'https://image.tmdb.org/t/p/';
const sparePosterLink =
  'https://thumbs.dreamstime.com/b/%D0%B8-%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF-%D0%B0%D0%BA%D0%B0%D1%82%D0%B0-%D0%BA%D0%B8%D0%BD%D0%BE-48746594.jpg';
const spareCastIconLink =
  'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

export const getMovies = async () => {
  try {
    const response = await axios.get('trending/movie/day', {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getSearch = async querySearch => {
  try {
    const response = await axios.get('search/movie', {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query: querySearch,
        page: 1,
      },
      headers: {
        Authorization: TOKEN,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const normalizeMoviesList = arr => {
  return arr.map(({ id, title, release_date, vote_average, poster_path }) => ({
    id,
    title,
    release_date,
    rating: vote_average.toFixed(1),
    poster: poster_path ? `${imageTMDB}w200${poster_path}` : sparePosterLink,
  }));
};

export const getMoviesById = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const objectMovie = ({
  id,
  title,
  release_date,
  vote_average,
  vote_count,
  poster_path,
  tagline,
  production_countries,
  genres,
  overview,
  runtime,
  budget,
  revenue,
}) => ({
  id,
  title,
  release_date,
  vote_count,
  rating: vote_average.toFixed(1),
  poster: poster_path ? `${imageTMDB}w300${poster_path}` : sparePosterLink,
  tagline,
  countries: production_countries.map(({ name }) => name).join(', '),
  genres: genres.map(({ name }) => name).join(', '),
  overview,
  runtime,
  budget,
  revenue,
});

export const getCast = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const normalizedCast = arr => {
  return arr.map(({ cast_id, character, name, profile_path }) => ({
    id: cast_id,
    character,
    name,
    photo: profile_path ? `${imageTMDB}w200${profile_path}` : spareCastIconLink,
  }));
};

export const getReviews = async movieId => {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
      headers: {
        Authorization: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const normalizedReviews = arr => {
  return arr.map(({ id, content, author_details, author }) => ({
    id,
    author,
    content,
    rating: author_details.rating,
    avatar:
      author_details.avatar_path &&
      `${imageTMDB}w200${author_details.avatar_path}`,
  }));
};
