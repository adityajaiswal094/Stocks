const favStocks = require("../db/queries/favStocks");

const getFavStocks = (app) => {
  app.get("/stocks/favourites", async (req, res) => {
    try {
      const user_id = req.header("user_id");

      const response = await favStocks(user_id);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = getFavStocks;
