const redisClient = require("../config/redisConfig");
const favStocks = require("../db/queries/favStocks");

const getFavStocks = (app) => {
  app.get("/stocks/favourites", async (req, res) => {
    try {
      const user_id = req.header("user_id");
      // const cachedValue = await redisClient.get(`favourites:${user_id}`);

      // if (cachedValue !== null) {
      //   return res.status(200).json(JSON.parse(cachedValue));
      // }

      const response = await favStocks(user_id);

      // await redisClient.set(`favourites:${user_id}`, JSON.stringify(response));
      // await redisClient.expire(`favourites:${user_id}`, 0);

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
