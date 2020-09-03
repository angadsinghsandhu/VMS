//Getting Modules
const express = require('express');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const entryModel = require('../../model/entryModel');
const userModel = require('../../model/userModel');
const {
    entryValidation
} = require('../../middleware/validation');
const { string } = require('joi');

//Creating Router
const router = express.Router();


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
        user = await userModel.findOne({
            emp_id: emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }

    //getting the array of entrys
    const entrys = user.entrys;

    // TODO (display entrys array on frontend list)
});

// getting single object from dataset
router.get('/:entry_num', verifyToken, async (req, res) => {
    //getting a emp_id using auth-token
    try {
        emp_id = req.tokenObject.emp_id;
    } catch (err) {
        console.log("getting object fron auth-token failed");
        res.json(err.message);
    }

    // Getting User
    try {
        user = await userModel.findOne({
            emp_id: emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }

    //getting the array of entrys
    entrys = user.entrys;

    //getting specific entry
    entry_num = req.params.entry_num;
    entry = entrys[entrys.length - entry_num];
    // COMMENT (Look into reversing entry_num)
    // TODO (display entry on frontend form to edit)
})

// Update Post
router.put('/:entry_num', verifyToken, async (req, res) => {
    //getting a emp_id using auth-token
    try {
        emp_id = req.tokenObject.emp_id;
    } catch (err) {
        console.log("getting object fron auth-token failed");
        res.json(err.message);
    }

    // Getting User
    try {
        user = await userModel.findOne({
            emp_id: emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }

    //getting the array of entrys
    entrys = user.entrys;

    //getting specific entry and updating
    entry_num = req.params.entry_num;

    // getting entry
    entry = entrys[entry_num]

    //editing entrys
    entry.name = req.body.name;
    entry.visit_date = req.body.visit_date;
    entry.active = req.body.active;

    // Creating the $set object dynamically beforehand.
    //eg: $set => { $set: { "entrys.0": {//entry object//}} }
    var $set = { $set: {} };
    $set.$set['entrys.' + entry_num] = entry;

    //updating newly created entry
    try {
        const modelEntry = await userModel.updateOne({
            emp_id: emp_id
        }, $set
        ).catch(function (err, aff, res) {
            if (err != null) {
                console.log(err);
            } else {
                console.log(res);
            }
        });

        console.log("updation of User sucessful");
        res.status(200).json(modelEntry);

    } catch (err) {

        console.log("updation of User failed");
        res.json(err.message);

    }

})

// delete post
router.delete('/:entry_num', verifyToken, async (req, res) => {
    //getting a emp_id using auth-token
    try {
        emp_id = req.tokenObject.emp_id;
    } catch (err) {
        console.log("getting object fron auth-token failed");
        res.json(err.message);
    }

    //getting specific entry
    entry_num = req.params.entry_num;
    entry = entrys[entry_num];

    /* TODO (update entrys array by using $splice to remove entry_num from array) */

    // Update User
    try {
        user = await userModel.findOne({
            emp_id: emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }
})


//Exporting Routes
module.exports = router;