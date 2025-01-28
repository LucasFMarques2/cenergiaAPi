const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const knex = require("../database/knex"); 

async function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("JSW token não encontrado", 401);
    }

    const [, token] = authHeader.split(" "); 

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);
        const user = await knex("usuarios").where({ id: user_id }).first();

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        req.user = {
            id: Number(user_id),
        };

        return next();
    } catch (error) {

        throw new AppError("JSW token inválido", 401);
    }
}

module.exports = ensureAuthenticated;
