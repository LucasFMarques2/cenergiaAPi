const { Router } = require('express')
const DepartamentoController = require('../controllers/departamentoController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const departamentoRoutes = Router()
const departamentoController = new DepartamentoController()

departamentoRoutes.post('/', ensureAuthenticated, departamentoController.create)
departamentoRoutes.get('/', departamentoController.index)
departamentoRoutes.get('/:id', departamentoController.show)
departamentoRoutes.delete('/:id', ensureAuthenticated, departamentoController.delete)


module.exports = departamentoRoutes