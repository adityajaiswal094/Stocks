const pool = require("../dbConfig");

const topTenStocks = async (value) => {
  try {
    const query = `SELECT * FROM all_stocks ORDER BY CAST(high AS NUMERIC) DESC LIMIT ${value}`;
    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

module.exports = topTenStocks;
