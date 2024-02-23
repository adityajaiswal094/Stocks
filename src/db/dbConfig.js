const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: connectionString,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // port: process.env.DB_PORT,
  // password: process.env.DB_PASSWORD,
});

module.exports = pool;
