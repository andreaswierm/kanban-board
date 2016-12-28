import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';

import thunk from 'redux-thunk';

import {
  routerMiddleware,
  routerReducer
} from 'react-router-redux';

import { browserHistory } from 'react-router';

import {
  auth
} from '~/redux';

const reducers = combineReducers({
  [auth.NAME]: auth.reducer,
  routing: routerReducer
});

const middlewares = compose(
  applyMiddleware(
    thunk,
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
);

export default createStore(
  reducers,
  middlewares
);
