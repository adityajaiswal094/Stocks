const pool = require("../db/config");

const addFav = async (stock_id) => {
  try {
    const insertQuery =
      "INSERT INTO favourite_stocks (stock_id) VALUES($1) RETURNING *";
    const response = await pool.query(insertQuery, [stock_id]);

    return response.rows[0];
  } catch (error) {
    const pattern = /Key \(stock_id\)=\([^)]*\) is not present in table/;
    return {
      status: 500,
      message: pattern.test(error.detail)
        ? `Stock with stock_id = ${stock_id} doesn't exist in dataset!`
        : "Something went wrong!",
    };
  }
};

module.exports = addFav;
