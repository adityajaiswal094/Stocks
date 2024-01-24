const redisClient = require("../config/redisConfig");
const favStocks = require("../db/queries/favStocks");

const getFavStocks = (app) => {
  app.get("/stocks/favourites", async (req, res) => {
    try {
      const cachedValue = await redisClient.get("favourites");

      if (cachedValue !== null) {
        return res.status(200).json(JSON.parse(cachedValue));
      }

      const response = await favStocks();

      await redisClient.set("favourites", JSON.stringify(response));
      await redisClient.expire("favourites", 900);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getFavStocks;
