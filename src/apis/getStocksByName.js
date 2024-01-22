const pool = require("../db/dbConfig");
const stocksByName = require("../db/queries/stocksByName");

const getStocksByName = (app) => {
  app.get("/stocks", async (req, res) => {
    try {
      const name = req.query.name;

      const response = await stocksByName(name);

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getStocksByName;
