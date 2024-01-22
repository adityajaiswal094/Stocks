/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favourite_stocks", (table) => {
    table.increments("id").primary().notNullable();
    table
      .integer("stock_id")
      .references("id")
      .inTable("all_stocks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favourite_stocks");
};
