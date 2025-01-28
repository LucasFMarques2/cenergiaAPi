const knex = require('../database/knex');
const moment = require('moment-timezone');

class BaseController {
    async create(req, res) {
        const usuario_id = req.user.id;
        const { 
           nome
        } = req.body;

        try {
            const existingBase = await knex('bases').where({ nome }).first();

            if (existingBase) {
                return res.status(400).json({
                    error: "Já existe uma base com esse nome"
                });
            }

            const currentTime = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const [base_id] = await knex('bases').insert({
                nome,
                usuario_id,
                created_at: currentTime
            });

            res.status(201).json({
                base_id,
                nome,
                usuario_id,
                created_at: currentTime
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        const formulario = await knex('bases').where({ id }).first();
        return res.json(formulario);
    }

    async index(req, res) {
        const bases = await knex('bases');
        return res.json(bases);
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const departamento = await knex('bases').where({ id }).first();

            if (!departamento) {
                return res.status(404).json({ error: "Base não encontrado." });
            }

            await knex('bases').where({ id }).del();

            return res.status(200).json({ message: "Base deletado com sucesso." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

module.exports = BaseController;
