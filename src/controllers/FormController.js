const knex = require('../database/knex');
const moment = require('moment-timezone');

class FormController {
    async create(req, res) {
        const { 
            nome_completo, 
            email, 
            matricula, 
            veloc_internet, 
            princ_problemas,
            servico_utilizado,
            site_acessado,
            base,
            usa_vpn,
            comput_ligado_wi_fi,
            departamento
        } = req.body;

        try {
            const formCount = await knex('formulario_de_pesquisa').where({ matricula }).count();

            if (formCount[0]['count(*)'] > 0) {
                return res.status(400).json({
                    error: "Já existe um formulário submetido com essa matrícula. Não é possível submeter novamente."
                });
            }

            const currentTime = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const [formulario_id] = await knex('formulario_de_pesquisa').insert({
                nome_completo,
                email,
                matricula,
                veloc_internet,
                princ_problemas,
                servico_utilizado,
                site_acessado,
                comput_ligado_wi_fi,
                usa_vpn,
                base,
                departamento,
                created_at: currentTime
            });

            res.status(201).json({
                formulario_id,
                nome_completo,
                email,
                matricula,
                veloc_internet,
                princ_problemas,
                servico_utilizado,
                site_acessado,
                base,
                departamento,
                created_at: currentTime
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno no servidor." });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        const formulario = await knex('formulario_de_pesquisa').where({ id }).first();

        return res.json(formulario);
    }

    async index(req, res) {
        const formularios = await knex('formulario_de_pesquisa');
        return res.json(formularios);
    }
}

module.exports = FormController;
