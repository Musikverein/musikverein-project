import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import { getGenres } from '../../redux/genre/genre-actions';

import './Home.scss';

export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="main-container">Contenedor principal</main>
    </>
  );
}
