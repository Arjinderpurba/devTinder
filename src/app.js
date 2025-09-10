const express = require('express');

const app = express();

app.use("/server",(req, res) => {
    res.send("Server ton boldan...")
});

app.use("/test",(req, res) => {
    res.send("mic testing...")
});

app.use("/available",(req, res) => {
    res.send("It's Available...")
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});