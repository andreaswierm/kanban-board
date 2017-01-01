import {
  ON_CREATE_SUCCESS,
  ON_LOAD_ALL
} from './constants';

import { push } from 'react-router-redux';

import API from '~/api';

export const create = (organizationId, payload) => (dispatch) => {
  return API
    .Project
    .create(organizationId, payload)
    .then((project) => {
      dispatch({
        type: ON_CREATE_SUCCESS,
        payload: project
      });
    });
};

export const loadAll = (organizationId) => (dispatch) => {
  return API
    .Project
    .all(organizationId)
    .then((projects) => {
      dispatch({
        type: ON_LOAD_ALL,
        payload: projects
      });
    });
};
