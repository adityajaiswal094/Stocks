const topTenStocks = require("../db/queries/topTenStocks");

const getTopTenStocks = (app) => {
  app.get("/top-stocks/:date", async (req, res) => {
    try {
      // const value = req.query.value || 10;
      const { date } = req.params;
      const value = 10;

      const response = await topTenStocks(value, date);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = getTopTenStocks;
