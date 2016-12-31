const authorize = () => {
  return fetch(`${process.env.API_URL}/session`, {
    method: 'GET',
    credentials: 'include'
  })
  .then((response) => {
    return response.json();
  });
}

const logout = () => {
  return fetch(`${process.env.API_URL}/session`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export default {
  authorize,
  logout
};
