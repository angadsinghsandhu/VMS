const express = require('express');
const userModel = require('../../model/userModel');
const verifyToken = require('../../middleware/getAuthenticatedToken');

//Creating Router
const router = express.Router();

// TODO (get information about user to display)

//CREATING CREATE ROUTES
//Init
router.get('/', verifyToken, async (req, res) => {
    //getting a emp_id using auth-token
    try {
        emp_id = req.tokenObject.emp_id;
    } catch (err) {
        console.log("getting object fron auth-token failed");
        res.json(err.message);
    }

    // Getting User
    try {
        const user_ = await userModel.findOne({
            emp_id: emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
        //sending the current user info
        res.json(user_);
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }
});


//Exporting Routes
module.exports = router;