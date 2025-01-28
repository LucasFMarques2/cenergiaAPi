const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const {compare} = require("bcryptjs");
const authConfig = require("../configs/auth");
const {sign} = require("jsonwebtoken");

class SessionController{
    async create(req,res){
        const {matricula, password} = req.body;
        const user = await knex("usuarios").where({matricula}).first();

        if(!user){
            throw new AppError("Matricula e/ou senha incorreta", 401);
        }
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Matricula e/ou senha incorreta", 401);
        }

        const { secret,expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        return res.json({user, token});

    }

}

module.exports = SessionController;

