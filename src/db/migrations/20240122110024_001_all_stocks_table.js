/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("all_stocks", (table) => {
    table.increments("id").primary().notNullable();
    table.string("sc_code").notNullable();
    table.string("sc_name").notNullable();
    table.string("open").notNullable();
    table.string("high").notNullable();
    table.string("low").notNullable();
    table.string("close").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("all_stocks");
};
