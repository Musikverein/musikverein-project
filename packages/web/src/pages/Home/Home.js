import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';
import Header from '../../components/Header';
import ROUTES from '../../routers/routes';

export function Home() {
  return (
    <>
      <Header />
      <main className="main-container">
        Contenedor principal{' '}
        <Link to={`${ROUTES.USER_WITHOUT_PARAM}609286780ceaca782e6fbbd2`}>
          Pulsar
        </Link>
        <p>
          <Link to={`${ROUTES.USER_WITHOUT_PARAM}6093ad427135253b9c669886`}>
            Pulsar aqui para otro
          </Link>
        </p>
      </main>
    </>
  );
}
