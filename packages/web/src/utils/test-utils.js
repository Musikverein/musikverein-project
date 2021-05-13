import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';

import rootReducer from '../redux/root-reducer';

/**
 *
 * @param {*} component React Component
 * @param {*} options { initialState, store }
 * @param {*} route React Router Route = "/"
 * @returns render()
 */
export function renderWithReduxAndRouter(component, options = {}, route = '/') {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;

  window.history.pushState({}, 'Test page', route);

  return {
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: BrowserRouter,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
