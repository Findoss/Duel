/* eslint guard-for-in: "error" */
import store from '@/store';

const HOST = `${window.location.origin}/api`;

// FIXME TODO
function request(path, attr) {
  return new Promise((resolve, reject) => {
    fetch(path, attr)
      .then(response => Promise.all([
        Promise.resolve(response.status),
        response.json(),
      ]))
      .then((data) => {
        const status = data[0];
        const json = data[1];
        if (status !== 200 && status !== 201) {
          store.dispatch(
            'addNotification',
            {
              type: 'error',
              message: json.message,
            },
          );
          reject(json);
        }
        resolve(json);
      })
      .catch((error) => {
        store.dispatch(
          'addNotification',
          {
            type: 'error',
            message: 'Something went wrong, the server feels bad.',
          },
        );
        reject(error);
      });
  });
}

const get = (path, params = '') => {
  const token = localStorage.getItem('session-token');
  const attr = {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  };

  let query = `${HOST}${path}`;
  if (params) {
    query += '?';
    Object.keys(params).forEach((param) => {
      query += `${param}=${params[param]}&`;
    });
  }

  return request(query, attr);
};

const send = (method, path, body) => {
  const token = localStorage.getItem('session-token');
  const attr = {
    method,
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body) || undefined,
  };
  return request(`${HOST}${path}`, attr);
};

export default { get, send };
