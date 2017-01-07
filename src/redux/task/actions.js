import {
  ON_CREATE_SUCCESS,
  ON_LOAD_SUCCESS
} from './constants';

import API from '~/api';

export const create = (organizationId, projectId, payload) => (dispatch) => {
  return API
    .Task
    .create(organizationId, projectId, payload)
    .then((task) => {
      dispatch({
        type: ON_CREATE_SUCCESS,
        payload: task
      });
    });
};

export const loadAll = (organizationId, projectId) => (dispatch) => {
  return API
    .Task
    .all(organizationId, projectId)
    .then((tasks) => {
      dispatch({
        type: ON_LOAD_SUCCESS,
        payload: tasks
      });
    });
};

