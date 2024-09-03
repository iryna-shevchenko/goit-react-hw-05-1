import { NavLink } from 'react-router-dom';

import clsx from 'clsx';
import css from './AdditionalNav.module.css';

export default function AdditionalNav() {
  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <nav>
      <ul className={css.list}>
        <li>
          <NavLink className={navLinkClass} to="cast">
            Top Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <div className={css.horizontalLine}></div>
    </nav>
  );
}
