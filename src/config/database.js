const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://arjinder:ycBOrVoYkoySJhMW@nodejs.masdgfy.mongodb.net/devTinder"
  );
};

module.exports = connectDB;