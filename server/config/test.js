module.exports = {
  db: {
    host: 'localhost',
    port: 27017,
    username: '',
    password: '',
    name: 'test_test_v2',
  },
  node: {
    host: 'localhost',
    port: 3003,
  },
  logger: {
    db: false,
    node: false,
    koa: false,
    i18n: false,
  },
  JWTKey: 'mysecretkey',
};
