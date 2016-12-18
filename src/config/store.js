import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';

import thunk from 'redux-thunk';

const reducers = combineReducers({});

const middlewares = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
);

export default createStore(
  reducers,
  middlewares
);
