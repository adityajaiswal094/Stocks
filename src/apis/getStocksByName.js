const redisClient = require("../config/redisConfig");
const stocksByName = require("../db/queries/stocksByName");

const getStocksByName = (app) => {
  app.get("/stocks", async (req, res) => {
    try {
      const name = req.query.name;

      const lowerCaseName = name.toLowerCase();
      // const cachedValue = await redisClient.get(
      //   `stocksbyname:${lowerCaseName}`
      // );

      // if (cachedValue) {
      //   return res.status(200).json(JSON.parse(cachedValue));
      // }

      const response = await stocksByName(name);

      // await redisClient.set(
      //   `stocksbyname:${lowerCaseName}`,
      //   JSON.stringify(response)
      // );
      // await redisClient.expire(`stocksbyname:${lowerCaseName}`, 0);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = getStocksByName;
