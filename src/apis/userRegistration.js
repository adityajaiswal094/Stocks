const { getUser, addUser } = require("../db/queries/queries");
const {hashPassword} = require("../utils/helper");

const userRegistration = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const {
        first_name = "",
        last_name = "",
        email_id = "",
        password = "",
      } = req.body;

      if (
        first_name === "" ||
        last_name === "" ||
        email_id === "" ||
        password === ""
      ) {
        return res
          .status(400)
          .json({ "title": "Error", "message": "Missing required fields." });
      }

      const checkUserExist = await getUser(email_id);

      if (checkUserExist !== undefined) {
        return res.status(400).json({
          "title": "User Already Exists",
          "message": "Email already in use!",
        });
      } else {
        const hashedPassword = await hashPassword(password);

        const userDetails = {
          first_name,
          last_name,
          email_id,
          hashedPassword,
        };
        const registerUser = await addUser(userDetails);

        return res.status(201).json({"title": "User Registered Successfully", "details": registerUser});
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

module.exports = userRegistration;
