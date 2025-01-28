exports.up = knex =>
    knex.schema.createTableIfNotExists('usuarios', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('matricula').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("usuarios");
  };
  