import React, { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles/App.scss';

import * as ROUTES from './routes';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

import { onAuthStateChanged } from './services/auth';
import { syncSignIn, signOut } from './redux/auth/auth-actions';
import { authSelector } from './redux/auth/auth-selectors';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  return (
    <div className="App__container">
      <Switch>
        <PublicRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.SIGN_UP}
          component={SignUp}
        />
        <PublicRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LOGIN}
          component={Login}
        />
        <PublicRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.RESET_PASSWORD}
          component={ResetPassword}
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.PROFILE}
          component={Profile}
          exact
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.HOME}
          component={Home}
          exact
        />

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
