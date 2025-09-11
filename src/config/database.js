const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://arjinder:ycBOrVoYkoySJhMW@nodejs.masdgfy.mongodb.net/&tls=true/devTinder"
  );
};

module.exports = connectDB;

