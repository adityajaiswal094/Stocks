const pool = require("../dbConfig");

const getUser = async (email_id) => {
  const query =
    "SELECT user_id, first_name, last_name, email_id, password FROM users WHERE email_id=$1";

  const result = await pool.query(query, [email_id]);

  return result.rows[0];
};

const addUser = async (userDetails) => {
  const { first_name, last_name, email_id, hashedPassword } =
    userDetails;

  const query =
    "INSERT INTO users (first_name, last_name, email_id, password) VALUES ($1, $2, $3, $4) RETURNING *";

  const result = await pool.query(query, [
    first_name,
    last_name,
    email_id,
    hashedPassword,
  ]);

  const registrationDetails = {
    user_id: result.rows[0].user_id,
    email_id: result.rows[0].email_id,
  };

  return registrationDetails;
};

const checkUserLoggedIn = async (user_id) => {
  const query = "SELECT session_id, user_id FROM sessions WHERE user_id=$1";

  const result = await pool.query(query, [user_id]);

  return result.rows[0];
};

const loginUser = async (user_id) => {
  const query = "INSERT INTO sessions (user_id) VALUES ($1) RETURNING *";

  const result = await pool.query(query, [user_id]);

  const loginDetails = {
    session_id: result.rows[0].session_id,
    user_id: result.rows[0].user_id,
  };

  return loginDetails;
};

const logoutUser = async (user_id) => {
  const query = "DELETE FROM sessions WHERE user_id=$1 RETURNING *";

  const result = await pool.query(query, [user_id]);

  const logoutDetails = {
    session_id: result.rows[0].session_id,
    user_id: result.rows[0].user_id,
  };

  return logoutDetails;
};


module.exports = {
  getUser,
  addUser,
  loginUser,
  logoutUser,
  checkUserLoggedIn,
};
