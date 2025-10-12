const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  

  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password} = req.body;

    // Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    
    //Creating a new instance of User model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /Feed - get all users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Delete User API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
        "photoUrl",
        "about",
        "gender",
        "age",
        "skills",
    ];

    const isUpdatesAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );

    if(!isUpdatesAllowed) {
        throw new Error("Update not allowed");    
    }

    if(data?.skills.length > 10){
        throw new Error("you can only add 10  skills")
    }


    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User data updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
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
