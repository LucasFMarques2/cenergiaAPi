const { Router } = require('express')
const BaseController = require('../controllers/BaseController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const baseRoutes = Router()
const baseController = new BaseController()

baseRoutes.post('/', ensureAuthenticated, baseController.create)
baseRoutes.get('/', baseController.index)
baseRoutes.get('/:id', baseController.show)
baseRoutes.delete('/:id', ensureAuthenticated, baseController.delete)


module.exports = baseRoutes