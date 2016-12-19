import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';

import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
  routing: routerReducer
});

const middlewares = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
);

export default createStore(
  reducers,
  middlewares
);
