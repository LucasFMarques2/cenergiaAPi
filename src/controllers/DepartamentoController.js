const knex = require('../database/knex');
const moment = require('moment-timezone');

class DepartamentoController {
    async create(req, res) {
        const usuario_id = req.user.id;
        const { 
           nome
        } = req.body;

        try {
            const existingDepartamento = await knex('departamentos').where({ nome }).first();

            if (existingDepartamento) {
                return res.status(400).json({
                    error: "Já existe um departamento com esse nome"
                });
            }

            const currentTime = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const [departamento_id] = await knex('departamentos').insert({
                nome,
                usuario_id,
                created_at: currentTime
            });

            res.status(201).json({
                departamento_id,
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
        const formulario = await knex('departamentos').where({ id }).first();
        return res.json(formulario);
    }

    async index(req, res) {
        const departamentos = await knex('departamentos');
        return res.json(departamentos);
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const departamento = await knex('departamentos').where({ id }).first();

            if (!departamento) {
                return res.status(404).json({ error: "Departamento não encontrado." });
            }

            await knex('departamentos').where({ id }).del();

            return res.status(200).json({ message: "Departamento deletado com sucesso." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

module.exports = DepartamentoController;
