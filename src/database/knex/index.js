const config = require("../../../knexfile");
const kenex = require("knex")

const conection = kenex(config.development);

module.exports = conection;