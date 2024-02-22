const pool = require("../dbConfig");

const stockPriceHistory = async (name, from, to) => {
  const query =
    "SELECT sc_code, sc_name, close, date FROM all_stocks WHERE LOWER(TRIM(TRAILING ' ' FROM sc_name)) = $1 AND date BETWEEN $2 AND $3";

  const result = await pool.query(query, [name, from, to]);

  return result.rows;
};

module.exports = stockPriceHistory;
