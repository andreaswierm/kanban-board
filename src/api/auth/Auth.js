const authorize = () => {
  return fetch('http://localhost:3000/session', {
    method: 'GET',
    credentials: 'include'
  })
  .then((response) => {
    return response.json();
  });
}

const logout = () => {
  return fetch('http://localhost:3000/session', {
    method: 'DELETE',
    credentials: 'include'
  });
}

export default {
  authorize,
  logout
};
