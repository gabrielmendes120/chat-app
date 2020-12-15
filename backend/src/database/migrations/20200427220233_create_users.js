exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('passwordEncripted').notNullable();
        table.string('username').notNullable();
        table.string('pathImage').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};