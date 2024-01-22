const pool = require("../db/dbConfig");

const getStocksByName = (app) => {
  app.get("/stocks", async (req, res) => {
    try {
      const name = req.query.name;
      const query = "SELECT * FROM all_stocks WHERE TRIM(TRAILING \' \' FROM sc_name) = $1";

      const response = await pool.query(query, [name]);

      const stockDetails = response.rows[0];

      res.status(200).json(stockDetails);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getStocksByName;
