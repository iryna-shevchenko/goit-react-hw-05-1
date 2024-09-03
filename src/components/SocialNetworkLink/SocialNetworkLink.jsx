import {
  BiLogoFacebook,
  BiLogoInstagramAlt,
  BiLogoTelegram,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';

import css from './SocialNetworkLink.module.css';

export default function SocialNetworkLink() {
  return (
    <ul className={css.container}>
      <li className={css.facebook}>
        <Link
          to="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <BiLogoFacebook />
        </Link>
      </li>
      <li className={css.instagram}>
        <Link
          to="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <BiLogoInstagramAlt />
        </Link>
      </li>
      <li className={css.telegram}>
        <Link
          to="https://www.telegram.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <BiLogoTelegram />
        </Link>
      </li>
    </ul>
  );
}
