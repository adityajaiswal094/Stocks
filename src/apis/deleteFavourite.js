const pool = require("../db/config");
const deleteFav = require("../db/deleteFav");

const deleteFavourite = (app) => {
  app.delete("/stocks/favourite/:id", async (req, res) => {
    try {
      const id = req.params.id || 0;

      if (id === 0) {
        res
          .status(400)
          .json({ title: "Bad Request", message: "Parameter cannot be empty" });
      }

      const result = await deleteFav(id);

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = deleteFavourite;
