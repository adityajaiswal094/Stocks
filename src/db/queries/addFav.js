const pool = require("../dbConfig");

const addFav = async (sc_code) => {
  try {
    const insertQuery =
      "INSERT INTO favourite_stocks (sc_code) VALUES($1) RETURNING *";
    const response = await pool.query(insertQuery, [sc_code]);

    return response.rows[0];
  } catch (error) {
    const pattern = /Key \(stock_id\)=\([^)]*\) is not present in table/;
    const message = error.message;
    console.log(message);
    throw new Error(
      pattern.test(error.detail)
        ? `Stock with stock_id = ${stock_id} doesn't exist in dataset!`
        : message.includes("invalid input syntax")
        ? "Invalid Input Syntax"
        : "Something went wrong!"
    );
  }
};

module.exports = addFav;
