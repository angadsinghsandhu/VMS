//Getting Modules
const express = require('express');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const entryModel = require('../../model/entryModel');
const userModel = require('../../model/userModel');
const {
    entryValidation
} = require('../../middleware/validation');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', verifyToken, async (req, res) => {
    // TODO (get all "active" status entrys and display on frontend)
});

//Exporting Routes
module.exports = router;