const redisClient = require("../config/redisConfig");
const topTenStocks = require("../db/queries/topTenStocks");

const getTopTenStocks = (app) => {
  app.get("/top-stocks", async (req, res) => {
    try {
      // const value = req.query.value || 10;
      const value = 10;
      const cachedValue = await redisClient.get("topstocks");

      if (cachedValue !== null) {
        return res.status(200).json(JSON.parse(cachedValue));
      }

      const response = await topTenStocks(value);

      await redisClient.set("topstocks", JSON.stringify(response));
      await redisClient.expire("topstocks", 86400);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getTopTenStocks;
