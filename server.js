const express = require("express");
const cors = require("cors");

const getTopTenStocks = require("./src/apis/getTopTenStocks");
const getStocksByName = require("./src/apis/getStocksByName");
const addFavourite = require("./src/apis/addFavourite");
const getFavStocks = require("./src/apis/getFavStocks");
const deleteFavourite = require("./src/apis/deleteFavourite");
const notFound = require("./src/apis/notFound");
const getStockPriceHistory = require("./src/apis/getStockPriceHistory");

const app = express();

app.use(express.json());
app.use(cors({origin: "*", methods:["GET", "POST", "PUT", "DELETE", "PATCH"]}));

const hostname = "0.0.0.0";
const PORT = process.env.PORT ||  21222;

// apis
getTopTenStocks(app);
getStocksByName(app);
addFavourite(app);
getFavStocks(app);
deleteFavourite(app);
getStockPriceHistory(app);
notFound(app);

app.listen(PORT, hostname, () => console.log(`Server running on port ${PORT}`));
