import {
  ON_LOAD_ALL
} from './constants';


import API from '~/api';

export const loadAll = () => (dispatch) => {
  return API
    .Project
    .all()
    .then((projects) => {
      dispatch({
        type: ON_LOAD_ALL,
        payload: projects
      })
    });
}
