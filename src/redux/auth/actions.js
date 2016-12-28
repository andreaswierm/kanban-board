import {
  ON_USER_AUTHORIZED
} from './constants';

import API from '~/api';

import { push } from 'react-router-redux';

export const authorize = () => (dispatch) => {
  return API
    .Auth
    .authorize()
    .then((user) => {
      dispatch({
        type: ON_USER_AUTHORIZED,
        payload: user
      });
    })
    .catch(() => {
      dispatch(push('/unauthorized'));
    });
}

export const logout = () => (dispatch) => {
  return API
    .Auth
    .logout()
    .then(() => {
      dispatch(push('/unauthorized'));
    });
}
