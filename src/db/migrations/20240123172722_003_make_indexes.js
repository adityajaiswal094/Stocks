/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("all_stocks", (table) => {
    table.index("sc_code");
    table.index("sc_name");
    table.index("date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("all_stocks", (table) => {
    table.dropIndex("sc_code");
    table.dropIndex("sc_name");
    table.dropIndex("date");
  });
};
