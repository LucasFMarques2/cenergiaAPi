exports.up = knex =>
    knex.schema.createTable("formulario_de_pesquisa", table => {
      table.increments("id").primary(); 
      table.text("nome_completo").notNullable();
      table.text("email").notNullable(); 
      table.text("matricula").notNullable();
      table.integer("veloc_internet").notNullable();
      table.text("princ_problemas").notNullable();
      table.text("servico_utilizado").notNullable();
      table.text("site_acessado").notNullable();
      table.text("usa_vpn").notNullable();
      table.text("comput_ligado_wi_fi").notNullable();
      table.text("base").notNullable();
      table.text("departamento").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  
  exports.down = knex => knex.schema.dropTableIfExists("formulario_de_pesquisa");
  