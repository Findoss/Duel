/* eslint guard-for-in: "error" */

const HOST = 'http://localHOST:3001';

function request(path, attr) {
  return new Promise((resolve, reject) => {
    fetch(path, attr)
      .then(response => response.json())
      .then((data) => {
        if (data.code === undefined) resolve(data);
        reject(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  });
}

const get = (path, params = undefined) => {
  const token = localStorage.getItem('session-token');
  const attr = {
    method: 'GET',
    headers: new Headers({
      Authorization: `token ${token}`,
    }),
  };

  let query = `${HOST}${path}`;
  if (params !== undefined) {
    query += '?';
    Object.keys(params).forEach((param) => {
      query += `${param}=${params[param]}&`;
    });
  }

  return request(query, attr);
};

const send = (method, path, body = undefined) => {
  const token = localStorage.getItem('session-token');
  const attr = {
    method,
    headers: new Headers({
      Authorization: `token ${token}`,
      'Content-Type': 'application/json; charset=utf-8;',
    }),
    body: JSON.stringify(body) || undefined,
  };
  return request(`${HOST}${path}`, attr);
};

export default { get, send };
