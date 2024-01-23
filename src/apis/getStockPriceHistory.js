const stockPriceHistory = require("../db/queries/stockPriceHistory");

const getStockPriceHistory = (app) => {
  app.get("/stocks/history", async (req, res) => {
    try {
      // from <= to
      const { name, from, to } = req.body;

      name.forEach((value, index, array) => {
        array[index] = value.toLowerCase();
      });

      const response = await stockPriceHistory(name, from, to);

      const groupedArray = response.reduce((result, element) => {
        const { sc_name } = element;

        // Check if the key exists in the result object
        if (!result[sc_name]) {
          // If not, create a new array for the key
          result[sc_name] = [];
        }

        // Push the object to the array for the current key
        result[sc_name].push(element);

        return result;
      }, {});

      const formattedArray = Object.entries(groupedArray).map(
        ([name, data]) => ({
          name,
          data,
        })
      );

      res.status(200).json(formattedArray);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ title: "Internal Server Error", message: error.message });
    }
  });
};

module.exports = getStockPriceHistory;
