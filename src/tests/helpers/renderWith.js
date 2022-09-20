import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

function withRedux(
  component,
  store,
) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

function withRouter(
  component,
  history,
) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export function renderWithRedux(
  component,
  options = {},
) {
  const {
    initialState,
    store = initialState
      ? createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
      )
      : createStore(
        rootReducer,
        applyMiddleware(thunk),
      ),
  } = options;

  return {
    ...render(withRedux(
      component,
      store,
    )),
    store,
  };
}

export function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory(
      [initialPath],
    ),
  } = {},
) {
  return {
    ...render(withRouter(
      component,
      history,
    )),
    history,
  };
}

export function renderWithRouterAndRedux(
  component,
  options = {},
) {
  const {
    initialPath = '/',
    history = createMemoryHistory(
      [initialPath],
    ),
  } = options;

  return {
    ...renderWithRedux(
      withRouter(
        component,
        history,
      ),
      options,
    ),
    history,
  };
}
