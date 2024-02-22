const pool = require("../dbConfig");

const stocksByName = async (name) => {
  const query =
    "SELECT DISTINCT ON (sc_name) id, sc_code, sc_name, open, high, low, close, date FROM all_stocks WHERE TRIM(TRAILING ' ' FROM sc_name) ILIKE $1";

  const result = await pool.query(query, [`%${name}%`]);

  return result.rows;
};

module.exports = stocksByName;
