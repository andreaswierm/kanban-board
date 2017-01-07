import {
  ON_CREATE_SUCCESS,
  ON_LOAD_SUCCESS
} from './constants';

const initialState = {
  list: []
};

const reducers = {
  [ON_CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: state.list.concat(action.payload)
    };
  },

  [ON_LOAD_SUCCESS]: (state, action) => {
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
