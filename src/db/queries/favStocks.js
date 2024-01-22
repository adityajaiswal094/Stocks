const pool = require("../dbConfig");

const favStocks = async () => {
  try {
    const query = "SELECT * FROM favourite_stocks";
    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

module.exports = favStocks;
