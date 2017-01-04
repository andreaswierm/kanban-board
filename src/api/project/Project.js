import moment from 'moment';

const buildForApi = (payload) => {
  return {name: payload.name};
};

const buildForUi = (payload) => {
  return {
    createdAt: moment(payload.created_at),
    id: payload.id,
    name: payload.name,
    updatedAt: moment(payload.updated_at)
  }
};

const all = (organizationId) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((projects) => {
      return projects.map(buildForUi);
    });
};

const create = (organizationId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((project) => {
      return buildForUi(project);
    });
};

const get = (organizationId, projectId) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}`, {
      credentials: 'include',
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((project) => {
      return buildForUi(project);
    });
};

const update = (organizationId, projectId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((project) => {
      return buildForUi(project);
    });
}

export default {
  all,
  create,
  get,
  update
};
