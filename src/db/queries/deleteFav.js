const pool = require("../dbConfig");

const deleteFav = async (stock_id) => {
  try {
    const insertQuery =
      "DELETE FROM favourite_stocks WHERE stock_id = $1 RETURNING *";
    const response = await pool.query(insertQuery, [stock_id]);

    const deletedRecord = response.rows;
    if (deletedRecord.length === 0) {
      return { status: 200, message: "Nothing to delete!" };
    } else {
      return { status: 200, message: "Record successfully deleted!" };
    }
  } catch (error) {
    return {
      status: 500,
      message: `Something went wrong! ${error}`,
    };
  }
};

module.exports = deleteFav;
