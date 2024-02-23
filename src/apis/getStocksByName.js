const favStocks = require("../db/queries/favStocks");
const stocksByName = require("../db/queries/stocksByName");

const getStocksByName = (app) => {
  app.get("/stocks", async (req, res) => {
    try {
      const name = req.query.name;
      const user_id = req.header('user_id');

      const response = await stocksByName(name);

      let searchResult = response.map((ele) => {return {...ele, isFavourite: false}});

      // check if any of the stocks in searchResult is already added to favourite for that user
      const favouriteStocks = await favStocks(user_id);



      for(let obj of favouriteStocks) {
        let sc_code = obj.sc_code;
        searchResult = searchResult.map((ele) => {
          if(ele['sc_code'] === sc_code) {
            ele.isFavourite = true;
          }
          return ele;
        });
      }

      return res.status(200).json(searchResult);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ "title": "Internal Server Error", "message": error.message });
    }
  });
};

module.exports = getStocksByName;
