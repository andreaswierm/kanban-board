import {
  ON_LOAD_ALL
} from './constants';

const initialState = {
  list: []
};

const reducers = {
  [ON_LOAD_ALL]: (state, action) => {
    return {
      ...state,
      list: action.payload
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
