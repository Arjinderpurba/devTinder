const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...");
      });
  })
  .catch((err) => {
    console.log("Database cannot be connected !!!");
  });


