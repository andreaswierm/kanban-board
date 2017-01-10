import {
  ON_CREATE_SUCCESS,
  ON_LOAD_SUCCESS,
  ON_REMOVE_SUCCESS,
  ON_UPDATE_SUCCESS
} from './constants';

import API from '~/api';

export const create = (organizationId, projectId, payload) => (dispatch) => {
  return API
    .TaskList
    .create(organizationId, projectId, payload)
    .then((taskList) => {
      dispatch({
        type: ON_CREATE_SUCCESS,
        payload: taskList
      });
    });
};

export const loadAll = (organizationId, projectId) => (dispatch) => {
  return API
    .TaskList
    .all(organizationId, projectId)
    .then((taskLists) => {
      dispatch({
        type: ON_LOAD_SUCCESS,
        payload: taskLists
      });

      return taskLists;
    });
};

export const remove = (organizationId, projectId, id) => (dispatch) => {
  return API
    .TaskList
    .remove(organizationId, projectId, id)
    .then(() => {
      dispatch({
        type: ON_REMOVE_SUCCESS,
        payload: {id}
      });
    });
};

export const update = (organizationId, projectId, taskListId, payload) => (dispatch) => {
  return API
    .TaskList
    .update(organizationId, projectId, taskListId, payload)
    .then((taskList) => {
      dispatch({
        type: ON_UPDATE_SUCCESS,
        payload: taskList
      });
    });
};
