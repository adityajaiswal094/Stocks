const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "stocks",
  port: 5432,
  password: "",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "stocks",
  port: 5432,
  password: "",
});

module.exports = { pool, client };
