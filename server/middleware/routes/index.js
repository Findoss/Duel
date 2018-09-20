const Router = require('koa-router');

const ctrlSession = require('../../controllers/session');

// routes
const routeStatics = require('./statics');
const routeUsers = require('./users');
const routeTools = require('./tools');
const routeAuth = require('./auth');
const routeMe = require('./me');
const routeSkill = require('./skills');

const routerAPI = new Router();
const routerModules = new Router();

routerAPI.use(
  '/api',
  routerModules
    .use('/static', routeStatics.routes())
    .use('/skills', routeSkill.routes())
    .use('/users', routeUsers.routes())
    .use('/tools', routeTools.routes())
    .use('/auth', routeAuth.routes())
    .use('/me', ctrlSession.tokenVerification, routeMe.routes())
    .routes(),
);

module.exports = () => routerAPI.routes();
