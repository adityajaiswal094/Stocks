/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('favourite_stocks', (table) => {
        table.primary(['sc_code', 'user_id']);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('favourite_stocks', (table) => {
        table.dropPrimary();
    });
  
};
