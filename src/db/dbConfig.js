const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.singapore-postgres.render.com/${process.env.DB_DATABASE}?ssl=true`;

const pool = new Pool({
  connectionString: connectionString,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // port: process.env.DB_PORT,
  // password: process.env.DB_PASSWORD || "",
});

module.exports = pool;
