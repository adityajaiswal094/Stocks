const redisClient = require("../config/redisConfig");
const addFav = require("../db/queries/addFav");

const addFavourite = (app) => {
  app.post("/stocks/favourite/:id", async (req, res) => {
    try {
      const id = req.params.id || "";

      if (id.length === 0) {
        return res
          .status(400)
          .json({ title: "Bad Request", message: "Parameter cannot be empty" });
      }

      const result = await addFav(id);

      await redisClient.expire("favourites", 0);

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = addFavourite;
