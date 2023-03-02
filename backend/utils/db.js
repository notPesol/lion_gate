const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oub1s0p.mongodb.net/test`
    );
    console.log('Database connected.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
};
