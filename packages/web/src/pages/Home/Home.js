import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Home.scss';
import { authSelector } from '../../redux/auth/auth-selectors';
import { signOut } from '../../redux/auth/auth-actions';
import Header from '../../components/Header/Header';

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <main>
      <Header />
      <section className="p-4">
        {/* {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )} */}
      </section>
    </main>
  );
}

export default Home;
