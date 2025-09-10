const express = require('express');

const app = express();

app.get("/user/:userId/:name/:passsword",(req, res) => {
    console.log(req.params);
    res.send({firstName: "Arjinder", lastName: "Singh"});
})

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});