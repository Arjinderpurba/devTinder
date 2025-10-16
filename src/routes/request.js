const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

    //Sending a connedction request
    console.log("Sending a connedction request");

    res.send(user.firstname + "sent the connect request!");
    
});

module.exports = requestRouter;