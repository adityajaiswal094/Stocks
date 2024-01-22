const pool = require("../db/dbConfig");
const topNStocks = require("../db/queries/topNStocks");

const getTopTenStocks = (app) => {
  app.get("/top-stocks", async (req, res) => {
    try {
      const value = req.query.value || 10;

      const response = await topNStocks(value);

      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getTopTenStocks;
