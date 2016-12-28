import {
  ON_USER_AUTHORIZED
} from './constants';

const initialState = {
  isAuthenticated: false,
  user: null
};

const reducers = {
  [ON_USER_AUTHORIZED]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload
    };
  }
};

export default (state = initialState, action) => {
  const reducer = reducers[action.type];

  if (reducer) {
    return reducer(state, action);
  }

  return state;
};
