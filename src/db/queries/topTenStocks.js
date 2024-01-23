const pool = require("../dbConfig");

const topTenStocks = async (value, date) => {
  try {
    const query =
      "SELECT id, sc_code, sc_name, open, high, low, close, date FROM all_stocks WHERE date = $1 ORDER BY CAST(high AS NUMERIC) DESC LIMIT $2";
    const result = await pool.query(query, [date, value]);

    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

module.exports = topTenStocks;
