const express = require("express");
const getTopTenStocks = require("./src/apis/getNStocks");
const getStocksByName = require("./src/apis/getStocksByName");
const addFavourite = require("./src/apis/addFavourite");
const getFavStocks = require("./src/apis/getFavStocks");
const deleteFavourite = require("./src/apis/deleteFavourite");
const notFound = require("./src/apis/notFound");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

// apis
getTopTenStocks(app);
getStocksByName(app);
addFavourite(app);
getFavStocks(app);
deleteFavourite(app);
notFound(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
