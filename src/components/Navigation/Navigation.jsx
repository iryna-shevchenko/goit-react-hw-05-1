import { NavLink, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import css from './Navigation.module.css';

const navLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <ul className={css.list}>
        <li>
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/movies" state={location}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
