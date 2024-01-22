// knexfile.js
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "stocks",
      port: "5432", // Default PostgreSQL port
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};
