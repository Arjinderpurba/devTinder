const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  //Creating a new instance of User model
  const user = new User({
    firstName: "Ronald",
    lastName: "Weasly",
    emailId: "ronaldweasly@maglu.com",
    password: "pitardevshanrakshnam",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

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
