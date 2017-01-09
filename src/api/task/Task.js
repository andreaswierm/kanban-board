const buildForApi = (payload) => {
  return {
    name: payload.name,
    task_list_id: payload.taskListId
  };
};

const buildForUi = (payload) => {
  return {
    id: payload.id,
    name: payload.name,
    taskListId: payload.task_list_id
  };
};

const all = (organizationId, projectId) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/tasks`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((tasks) => {
      return tasks.map(buildForUi);
    });
};

const create = (organizationId, projectId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/tasks`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((task) => {
      return buildForUi(task);
    });
};

const update = (organizationId, projectId, taskId, payload) => {
  return fetch(`${process.env.API_URL}/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}`, {
      body: JSON.stringify(buildForApi(payload)),
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    })
    .then((task) => {
      return buildForUi(task);
    });
};

export default {
  all,
  create,
  update
};
