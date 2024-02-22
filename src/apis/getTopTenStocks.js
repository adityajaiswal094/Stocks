const redisClient = require("../config/redisConfig");
const topTenStocks = require("../db/queries/topTenStocks");

const getTopTenStocks = (app) => {
  app.get("/top-stocks/:date", async (req, res) => {
    try {
      // const value = req.query.value || 10;
      const { date } = req.params;
      const value = 10;

      // const cachedValue = await redisClient.get(`topstocks:${date}`);

      // if (cachedValue !== null) {
      //   return res.status(200).json(JSON.parse(cachedValue));
      // }

      const response = await topTenStocks(value, date);

      // await redisClient.set(`topstocks:${date}`, JSON.stringify(response));
      // await redisClient.expire(`topstocks:${date}`, 900);

      return res.status(200).json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = getTopTenStocks;
