const routes = require('express').Router();
const UserController = require('./app/controllers/UserController');
const FinancesController = require('./app/controllers/FinancesController');
const FiltersController = require('./app/controllers/FiltersController');
const accessToken = require('./app/middlewares/accessToken');

routes.get('/', (req, res) => {
  res.json({
    status: 'success in the root route',
  });
});

routes.post('/users', UserController.store);
routes.get('/login/:id', accessToken, UserController.show);
routes.put('/balance', accessToken, UserController.update);
routes.post('/finances', accessToken, FinancesController.store);
routes.put('/paid', accessToken, FinancesController.update);
routes.get('/finances/:id', accessToken, FinancesController.index);
routes.get('/teste', accessToken, FinancesController.teste);
routes.get('/teste/media', accessToken, FinancesController.teste2);
routes.get('/filters/:id', accessToken, FiltersController.index);

module.exports = routes;
