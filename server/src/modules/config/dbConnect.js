const { connect } = require("mongoose");

const dbConnect = async () => {
  try {
    await connect("mongodb://localhost:27017", {
      dbName: process.env.DB_NAME,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { dbConnect };
