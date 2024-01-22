const pool = require("../db/dbConfig");

const getTopTenStocks = (app) => {
  app.get("/top-stocks", async (req, res) => {
    try {
      const query = "SELECT * FROM all_stocks ORDER BY CAST(high AS NUMERIC) DESC LIMIT 10";
      const result = await pool.query(query);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getTopTenStocks;
