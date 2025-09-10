const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.post("/user/login", (req, res) => {
    res.send("User logged in Successfully");
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("All data Sent");
});

app.get("/admin/getAllData",(req, res) => {
    res.send("All data Sent");
});


app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});