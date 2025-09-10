const express = require('express');

const app = express();

app.get("/user",(req, res) => {
    res.send({firstName: "Arjinder", lastName: "Singh"});
})

app.post("/user",(req, res) => {
    res.send("Data successfully saved in the DB");
})

app.delete("/user",(req, res) => {
    res.send("Data Deleted successfully from the DB");
})

app.use("/user",(req, res) => {
    res.send("It's Available...")
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});