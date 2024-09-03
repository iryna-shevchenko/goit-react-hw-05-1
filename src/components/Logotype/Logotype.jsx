import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

import css from './Logotype.module.css';

export default function Logotype() {
  return (
    <div>
      <Link className={css.logo} to="/">
        <img src={logo} alt="Logotype search movies" width={24} />
        <p className={css.text}>search.movies</p>
      </Link>
    </div>
  );
}
