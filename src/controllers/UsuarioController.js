const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsuarioController {
  async create(req, res) {
    const { name, email, password, matricula } = req.body;

    const checkMatriculaExists = await knex("usuarios").where({ matricula }).first();
    if (checkMatriculaExists) {
      throw new AppError("Já existe um usuário com esta matrícula.");
    }
    const checkEmailExists = await knex("usuarios").where({ email }).first();
    if (checkEmailExists) {
      throw new AppError("Já existe um usuário com este email.");
    }


    const hashedPassword = await hash(password, 8);

    await knex("usuarios").insert({
      name,
      email,
      matricula,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Usuário criado com sucesso." });
  }

  async update(req, res) {
    const { matricula, email, old_password, new_password } = req.body;

    const user = await knex("usuarios").where({ matricula }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

 
    const userWithUpdatedEmail = await knex("usuarios").where({ email }).first();
    if (userWithUpdatedEmail && userWithUpdatedEmail.matricula !== matricula) {
      throw new AppError("Este email já está em uso por outro usuário.");
    }

  
    const checkOldPassword = await compare(old_password, user.password);

    if (!checkOldPassword) {
      throw new AppError("Senha antiga incorreta.");
    }

    const hashedNewPassword = await hash(new_password, 8);

    await knex("usuarios")
      .where({ matricula })
      .update({
        email,
        password: hashedNewPassword,
        updated_at: knex.fn.now(),
      });

    return res.status(200).json({ message: "Senha e email atualizados com sucesso." });
  }
}

module.exports = UsuarioController;
