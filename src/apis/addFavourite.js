const redisClient = require("../config/redisConfig");
const addFav = require("../db/queries/addFav");

const addFavourite = (app) => {
  app.post("/stocks/favourite/:sc_code", async (req, res) => {
    try {
      const sc_code = req.params.sc_code || "";
      const user_id = req.header('user_id');

      const result = await addFav(sc_code, user_id);

      // await redisClient.del("favourites");

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = addFavourite;
