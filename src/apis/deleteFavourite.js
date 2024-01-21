const pool = require("../db/config");

const deleteFavourite = (app) => {
  app.post("/stocks/favourite/:id", async (req, res) => {
    try {
      const sc_code = req.params.id || "";

      if (sc_code.length === 0) {
        res
          .status(400)
          .json({ title: "Bad Request", message: "Parameter cannot be empty" });
      }

      // check if sc_code exists in stocks table or not
      const checkDataQuery = "SELECT * FROM stocks WHERE sc_code = $1";
      const result = await pool.query(checkDataQuery, [sc_code]);

      if (result.rowCount === 1) {
        const deleteQuery =
          "DELETE FROM favourite_stocks WHERE sc_code = $1 RETURNING *";
        const response = await pool.query(deleteQuery, [sc_code]);

        res.status(200).json(response);
      } else {
        res.status(500).json({
          title: "Internal Server Error",
          message: "Stock with this code doesn't exist",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = deleteFavourite;
