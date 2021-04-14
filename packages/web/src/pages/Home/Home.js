import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Home.scss';
import Header from '../../components/Header';
import { authSelector } from '../../redux/auth/auth-selectors';
import { signOut } from '../../redux/auth/auth-actions';

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <main className="p-4">
      <Header />
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )}
      </section>
      <button type="button" onClick={handleLogOut}>
        LogOut
      </button>
    </main>
  );
}

export default Home;
