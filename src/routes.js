const routes = require('express').Router();
const UserController = require('./app/controllers/UserController');
const SessionsController = require('./app/controllers/SessionsController');
const FinancesController = require('./app/controllers/FinancesController');
const FiltersController = require('./app/controllers/FiltersController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');
const accessToken = require('./app/middlewares/accessToken');

routes.get('/', (req, res) => res.json({
  status: 'running',
}));

routes.post('/users', UserController.store);
routes.put('/users/forgot', accessToken, UserController.edite);
routes.post('/users/forgot', ForgotPasswordController.store);
routes.post('/sessions', SessionsController.store);
routes.get('/login/:id', accessToken, UserController.show);
routes.put('/balance', accessToken, UserController.update);
routes.post('/finances', accessToken, FinancesController.store);
routes.get('/finances/teste', accessToken, FinancesController.teste2);
routes.put('/paid', accessToken, FinancesController.update);
routes.get('/finances/:id', accessToken, FinancesController.index);
routes.get('/teste', accessToken, FinancesController.teste);
routes.get('/teste/media', accessToken, FinancesController.teste2);
routes.get('/filters/:id', accessToken, FiltersController.index);

module.exports = routes;
