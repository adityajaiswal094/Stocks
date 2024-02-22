const pool = require("../dbConfig");

const stocksByName = async (name) => {
  const queryStartingWithPattern =
    "SELECT DISTINCT ON (sc_name) id, sc_code, sc_name, open, high, low, close, date FROM all_stocks WHERE TRIM(TRAILING ' ' FROM sc_name) ILIKE $1";

  const queryContainingPattern =
    "SELECT DISTINCT ON (sc_name) id, sc_code, sc_name, open, high, low, close, date FROM all_stocks WHERE TRIM(TRAILING ' ' FROM sc_name) ILIKE $1 AND TRIM(TRAILING ' ' FROM sc_name) NOT ILIKE $2";

  const startingWithPattern = await pool.query(queryStartingWithPattern, [`${name}%`]);
  const containingPattern = await pool.query(queryContainingPattern, [`%${name}%`, `${name}%`]);

  const result = [...startingWithPattern.rows, ...containingPattern.rows];

  return result;
};

module.exports = stocksByName;
