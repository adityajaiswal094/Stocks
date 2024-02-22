const { checkUserLoggedIn, logoutUser } = require("../db/queries/queries");

const userLogout = (app) => {
  app.post("/logout", async (req, res) => {
    try {
      const { user_id } = req.body;

      if (user_id === undefined) {
        return res
          .status(400)
          .json({ "title": "Bad Request", "message": "Missing required fields." });
      }

      const userLoggedIn = await checkUserLoggedIn(user_id);

      if (userLoggedIn === undefined) {
        return res
          .status(404)
          .json({ "title": "User Not Found", "message": "User not logged in." });
      } else {
        const response = await logoutUser(user_id);

        return res.status(200).json({"title": "User Logged Out", "details": response});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        "title": "Internal Server Error",
        "message": "Something went wrong!",
      });
    }
  });
};

module.exports = userLogout;
