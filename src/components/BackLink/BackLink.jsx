import { TiArrowBack } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';

import css from './BackLink.module.css';

export default function BackLink() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  return (
    <Link className={css.backLink} to={backLinkRef.current}>
      <TiArrowBack size={20} />
      Go back
    </Link>
  );
}
