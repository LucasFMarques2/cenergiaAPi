const { Router } = require('express')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const FormController = require('../controllers/FormController')


const formularioRoutes = Router()

const formController = new FormController()

formularioRoutes.get('/', ensureAuthenticated ,formController.index)
formularioRoutes.post('/', formController.create)
formularioRoutes.get('/:id',ensureAuthenticated , formController.show)


module.exports = formularioRoutes