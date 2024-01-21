const addFav = require("../db/addFav");

const addFavourite = (app) => {
  app.post("/stocks/favourite/:id", async (req, res) => {
    try {
      const id = req.params.id || "";

      if (id.length === 0) {
        res
          .status(400)
          .json({ title: "Bad Request", message: "Parameter cannot be empty" });
      }

      const result = await addFav(id);

      if (result.status === 500) {
        res.status(500).json({
          title: "Internal Server Error",
          message: result.message,
        });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = addFavourite;
