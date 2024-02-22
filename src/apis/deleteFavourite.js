const redisClient = require("../config/redisConfig");
const deleteFav = require("../db/queries/deleteFav");

const deleteFavourite = (app) => {
  app.delete("/stocks/favourite/:sc_code", async (req, res) => {
    try {
      const sc_code = req.params.sc_code;

      const response = await deleteFav(sc_code);

      // await redisClient.del("favourites");

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = deleteFavourite;
