import {
  ON_CREATE_SUCCESS,
  ON_LOAD_ALL,
  ON_LOAD_PROJECT_TO_EDIT,
  ON_UPDATE_SUCCESS
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

export const getProject = (organizationId, projectId) => (dispatch) => {
  return API
    .Project
    .get(organizationId, projectId)
    .then((project) => {
      dispatch({
        type: ON_LOAD_PROJECT_TO_EDIT,
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

export const update = (organizationId, projectId, payload) => (dispatch) => {
  return API
    .Project
    .update(organizationId, projectId, payload)
    .then((project) => {
      dispatch({
        type: ON_UPDATE_SUCCESS,
        payload: project
      });
    });
};
