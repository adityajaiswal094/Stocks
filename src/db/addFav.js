const pool = require("../db/config");

const addFav = async (sc_code) => {
  try {
    const insertQuery =
      "INSERT INTO favourite_stocks (sc_code) VALUES($1) RETURNING *";
    const response = await pool.query(insertQuery, [sc_code]);

    return response.rows[0];
  } catch (error) {
    const pattern = /Key \(sc_code\)=\([^)]*\) is not present in table/;
    return {
      status: 500,
      message: pattern.test(error.detail)
        ? `Stock with sc_code = ${sc_code} doesn't exist in dataset!`
        : "Something went wrong!",
    };
  }
};

module.exports = addFav;
