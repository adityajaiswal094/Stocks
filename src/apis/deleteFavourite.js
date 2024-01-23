const redisClient = require("../config/redisConfig");
const deleteFav = require("../db/queries/deleteFav");

const deleteFavourite = (app) => {
  app.delete("/stocks/favourite/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const response = await deleteFav(id);

      await redisClient.expire("favourites", 0);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = deleteFavourite;
