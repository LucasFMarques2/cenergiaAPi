const {Router} = require("express")

const SessionController = require('../controllers/SessionController')
const sessionCotroller = new SessionController();

const sessionRoutes = Router();

sessionRoutes.post('/', sessionCotroller.create);

module.exports = sessionRoutes