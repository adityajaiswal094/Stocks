/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("favourite_stocks", (table) => {
    table.dropColumn("stock_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("favourite_stocks", (table) => {
    table
      .integer("stock_id")
      .references("id")
      .inTable("all_stocks")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
  });
};
