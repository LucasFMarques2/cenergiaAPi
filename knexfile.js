const path = require('path');
require('dotenv').config();


module.exports = {
  development: {
    client: 'mysql2', 
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USE,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
  },
};
