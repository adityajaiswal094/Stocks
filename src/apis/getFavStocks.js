const pool = require("../db/dbConfig");
const favStocks = require("../db/queries/favStocks");

const getFavStocks = (app) => {
  app.get("/stocks/favourites", async (req, res) => {
    try {
      const response = await favStocks();

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getFavStocks;
