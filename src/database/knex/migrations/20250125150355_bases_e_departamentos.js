exports.up = knex =>
    Promise.all([
      knex.schema.createTableIfNotExists("bases", table => {
        table.increments("id").primary();
        table.text("nome").notNullable();
  
        table
          .integer("usuario_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
  
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      }),
  
      knex.schema.createTableIfNotExists("departamentos", table => {
        table.increments("id").primary();
        table.text("nome").notNullable();
  
        table
          .integer("usuario_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("usuarios")
          .onUpdate("CASCADE");
  
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      }),
    ]);
  
    exports.down = function(knex) {
  return knex.schema.dropTableIfExists("usuarios"); 
};
