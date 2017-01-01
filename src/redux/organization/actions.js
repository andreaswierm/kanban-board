import { ON_LOAD_ALL } from './constants';
import { replace } from 'react-router-redux';
import API from '~/api';

export const loadAll = (selectedOrganizationId) => (dispatch, getState) => {
  return API
    .Organization
    .all()
    .then((organizations) => {
      dispatch({
        type: ON_LOAD_ALL,
        payload: organizations
      });

      if (!selectedOrganizationId) {
        dispatch(replace(`/organizations/${organizations[0].id}/projects`));
      }
    });
};
