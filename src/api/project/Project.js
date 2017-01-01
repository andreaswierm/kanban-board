import moment from 'moment';

const buildForUi = (payload) => {
  return {
    createdAt: moment(payload.created_at),
    id: payload.id,
    name: payload.name,
    updatedAt: moment(payload.updated_at)
  }
}

const all = () => {
  return fetch(`${process.env.API_URL}/projects`, {
    method: 'GET',
    credentials: 'include'
  })
  .then((response) => {
    return response.json();
  })
  .then((projects) => {
    return projects.map(buildForUi);
  });
}

export default {
  all
};
