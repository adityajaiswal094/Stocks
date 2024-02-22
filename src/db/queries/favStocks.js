const pool = require("../dbConfig");

const favStocks = async (user_id) => {
  const query = "SELECT * FROM favourite_stocks WHERE user_id = $1";
  const result = await pool.query(query, [user_id]);

  const stocks = result.rows.map((ele) => ele.sc_code);

  const favouriteStocks = result.rows;

  // getting stock details from all stocks table
  const newQuery =
    "SELECT DISTINCT sc_name, sc_code FROM all_stocks WHERE sc_code = ANY($1)";
  const newResult = await pool.query(newQuery, [stocks]);

  const data = newResult.rows;

  const scCodeToNameMap = {};
  data.forEach((obj) => {
    scCodeToNameMap[obj.sc_code] = obj.sc_name.trim(); // Removing leading and trailing whitespaces
  });

  // Add sc_name to objects in array2 based on sc_code
  favouriteStocks.forEach((obj) => {
    obj.sc_name = scCodeToNameMap[obj.sc_code];
  });

  return favouriteStocks;
};

module.exports = favStocks;
