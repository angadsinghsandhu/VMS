//Getting Modules
const express = require('express');
const verifyToken = require('../middleware/getAuthenticatedToken');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', async (req, res) => {
    res.send("home page");
});

//Exporting Routes
module.exports = router;