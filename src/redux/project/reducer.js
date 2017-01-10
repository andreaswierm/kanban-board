import {
  ON_CREATE_SUCCESS,
  ON_LOAD_ALL,
  ON_UPDATE_SUCCESS
} from './constants';

const initialState = {list: []};

const reducers = {
  [ON_CREATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: state.list.concat(action.payload)
    };
  },

  [ON_LOAD_ALL]: (state, action) => {
    return {
      ...state,
      list: action.payload
    };
  },

  [ON_UPDATE_SUCCESS]: (state, action) => {
    const newList = state.list.map((project) => {
      if (project.id === action.payload.id) {
        return action.payload;
      }

      return project;
    });

    return {
      ...state,
      list: newList
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
