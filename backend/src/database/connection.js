var knex = require('knex');
const configuration = require('../../knexfile');

const enviroment = configuration.development;

const connection = knex(enviroment);

module.exports = connection;