module.exports = {
  db: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    name: process.env.MONGODB_DB,
  },
  node: {
    host: process.env.NODE_HOST,
    port: process.env.PORT,
  },
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  logger: {
    db: process.env.LOGGER_DB,
    node: process.env.LOGGER_NODE,
    koa: process.env.LOGGER_KOA,
  },
  JWTKey: process.env.JWT_KEY,
};
