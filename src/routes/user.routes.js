const { Router } = require("express");
const UsuarioController = require('../controllers/UsuarioController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();

const usuarioController = new UsuarioController();

userRouter.post('/', usuarioController.create)
userRouter.put('/', ensureAuthenticated, usuarioController.update);

module.exports = userRouter;