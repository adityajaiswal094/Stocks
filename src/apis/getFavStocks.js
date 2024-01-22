const pool = require("../db/dbConfig");

const getFavStocks = (app) => {
  app.get("/stocks/favourites", async (req, res) => {
    try {
      const query = "SELECT * FROM favourite_stocks";
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

module.exports = getFavStocks;
