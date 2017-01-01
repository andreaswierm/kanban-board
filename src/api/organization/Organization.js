const buildForUi = (payload) => {
  return {
    id: payload.id,
    name: payload.name
  };
};

const all = () => {
  return fetch(`${process.env.API_URL}/organizations`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((organizations) => {
      return organizations.map(buildForUi);
    });
};

export default {all};
