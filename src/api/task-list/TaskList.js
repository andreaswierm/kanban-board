const buildForApi = (payload) => {
  return {name: payload.name};
};

const buildForUi = (payload) => {
  return {
    id: payload.id,
    name: payload.name,
    position: payload.position
  };
};

const all = (organizationId, projectId) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/task_lists`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((taskLists) => {
      return taskLists.map(buildForUi);
    });
};

const create = (organizationId, projectId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/task_lists`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((taskList) => {
      return buildForUi(taskList);
    });
};

const get = (organizationId, projectId, taskListId) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/task_lists/${taskListId}`, {
      credentials: 'include',
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })
    .then((taskList) => {
      return buildForUi(taskList);
    });
};

const remove = (organizationId, projectId, id) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/task_lists/${id}`, {
    credentials: 'include',
    method: 'DELETE'
  });
};

const update = (organizationId, projectId, taskListId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/task_lists/${taskListId}`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((taskList) => {
      return buildForUi(taskList);
    });
};

export default {
  all,
  create,
  get,
  remove,
  update
};
