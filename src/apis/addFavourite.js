const addFav = require("../db/addFav");
const pool = require("../db/config");

const addFavourite = (app) => {
  app.post("/stocks/favourite/:id", async (req, res) => {
    try {
      const sc_code = req.params.id || "";

      if (sc_code.length === 0) {
        res
          .status(400)
          .json({ title: "Bad Request", message: "Parameter cannot be empty" });
      }

      const result = await addFav(sc_code);

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
