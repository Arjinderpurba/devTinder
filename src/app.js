const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    
  //Creating a new instance of User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

// Feed API - GET /Feed - get all users from database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err){
        res.status(400).send("Something went wrong");
    }
})

// Delete User API
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try{
        const user  = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err){
        res.status(400).send("Something went wrong");
    }
});

// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try{
        await User.findByIdAndUpdate({ _id: userId },data);
        res.send("User data updated successfully");
    } catch(err){
        res.status(400).send("Something went wrong");
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
