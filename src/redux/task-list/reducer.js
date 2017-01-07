import {
  ON_CREATE_SUCCESS,
  ON_LOAD_SUCCESS,
  ON_LOAD_TO_EDIT,
  ON_REMOVE_SUCCESS,
  ON_UPDATE_SUCCESS
} from './constants';

const initialState = {
  edit: {},
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
  },

  [ON_LOAD_TO_EDIT]: (state, action) => {
    return {
      ...state,
      edit: action.payload
    };
  },

  [ON_REMOVE_SUCCESS]: (state, action) => {
    return {
      ...state,
      list: state.list.filter((taskList) => {
        return taskList.id !== action.payload.id;
      })
    };
  },

  [ON_UPDATE_SUCCESS]: (state, action) => {
    const newList = state.list.map((taskList) => {
      if (taskList.id === action.payload.id) {
        return action.payload;
      }

      return taskList;
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
