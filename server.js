const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const getTopTenStocks = require("./src/apis/getTopTenStocks");
const getStocksByName = require("./src/apis/getStocksByName");
const addFavourite = require("./src/apis/addFavourite");
const getFavStocks = require("./src/apis/getFavStocks");
const deleteFavourite = require("./src/apis/deleteFavourite");
const notFound = require("./src/apis/notFound");
const getStockPriceHistory = require("./src/apis/getStockPriceHistory");
const userRegistration = require("./src/apis/userRegistration");
const userLogout = require("./src/apis/userLogout");
const userLogin = require("./src/apis/userLogin");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 21222;

// test
app.get("/", (req, res) => {
  res.status(200).json({ "title": "Testing", "message": "Application Working" });
});

// apis
getTopTenStocks(app);
getStocksByName(app);
addFavourite(app);
getFavStocks(app);
deleteFavourite(app);
getStockPriceHistory(app);
userLogin(app);
userLogout(app);
userRegistration(app);
notFound(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
