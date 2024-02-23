const {
  getUser,
  checkUserLoggedIn,
  loginUser,
} = require("../db/queries/queries");
const { comparePassword } = require("../utils/helper");

const userLogin = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { email_id = "", password = "" } = req.body;

      if (email_id === "" || password === "") {
        return res
          .status(400)
          .json({ "title": "Bad Request", "message": "Missing required fields." });
      }

      const checkUserExist = await getUser(email_id);

      if (checkUserExist === undefined) {
        return res.status(404).json({
          "title": "User Not Found",
          "message": "User with the following email does not exist.",
        });
      } else {
        const userLoggedIn = await checkUserLoggedIn(checkUserExist.user_id);

        if (userLoggedIn !== undefined) {
          const userData = {
            session_id: userLoggedIn.session_id,
            user_id: userLoggedIn.user_id,
            email_id: checkUserExist.email_id,
            first_name: checkUserExist.first_name,
            last_name: checkUserExist.last_name,
          };

          return res
            .status(200)
            .json({ "title": "User Already Logged In", "details": userData });
        } else {
          const storedPassword = checkUserExist.password;
          const matchPassword = await comparePassword(password, storedPassword);

          if (matchPassword) {
            const login_user = await loginUser(checkUserExist.user_id);

            const userData = {
              session_id: login_user.session_id,
              user_id: login_user.user_id,
              email_id: checkUserExist.email_id,
              first_name: checkUserExist.first_name,
              last_name: checkUserExist.last_name,
            };

            return res
              .status(200)
              .json({ "title": "User Logged In", "details": userData });
          } else {
            return res
              .status(401)
              .json({ "title": "Invalid Credentials", "message": "Please check your password." });
          }
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        "title": "Internal Server Error",
        "message": error.message,
      });
    }
  });
};

module.exports = userLogin;
