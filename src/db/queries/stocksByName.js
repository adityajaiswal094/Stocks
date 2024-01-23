const pool = require("../dbConfig");

const stocksByName = async (name) => {
  const query =
    "SELECT * FROM all_stocks WHERE LOWER(TRIM(TRAILING ' ' FROM sc_name)) = $1";

  const result = await pool.query(query, [name]);

  return result.rows;
};

module.exports = stocksByName;
