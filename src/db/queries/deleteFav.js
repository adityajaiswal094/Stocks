const pool = require("../dbConfig");

const deleteFav = async (stock_id) => {
  try {
    const insertQuery =
      "DELETE FROM favourite_stocks WHERE stock_id = $1 RETURNING *";
    const result = await pool.query(insertQuery, [stock_id]);

    const deletedRecord = result.rows;
    if (deletedRecord.length === 0) {
      return { status: 200, message: "Nothing to delete!" };
    } else {
      return { status: 200, message: "Record successfully deleted!" };
    }
  } catch (error) {
    const message = error.message;
    throw new Error(
      message.includes("invalid input syntax")
        ? "Invalid Input Syntax!"
        : "Something went wrong!"
    );
  }
};

module.exports = deleteFav;
