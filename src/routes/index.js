const { Router } = require("express");
const formularioRoutes = require('./formulario.routes');
const baseRoutes = require('./base.routes');
const userRouter = require('./user.routes');
const sessionRoutes = require('./session.routes');
const departamentoRoutes = require('./departamento.routes');

const router = Router();

router.use('/formularios', formularioRoutes);
router.use('/bases', baseRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/usuario', userRouter);
router.use('/session', sessionRoutes);


module.exports = router;
