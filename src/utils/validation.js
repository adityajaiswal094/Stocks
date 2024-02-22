const { checkUserLoggedIn } = require("../db/queries/queries");

const validateUser = async (req, res, next) => {
  try {
    const user_id = req.header("user_id");

    // check user logged in
    if (user_id === undefined || user_id === "") {
      return res.status(400).json({
        "title": "Bad Request",
        "message": "Required header ('user_id') missing.",
      });
    } else {
      const userLoggedIn = await checkUserLoggedIn(user_id);

      if (userLoggedIn === undefined) {
        return res.status(401).json({
          "title": "Unauthorized",
          "message": "User should login before accessing this feature!",
        });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      "title": "Internal Server Error",
      "message": "Something went wrong!",
    });
  }
};

module.exports = validateUser;
