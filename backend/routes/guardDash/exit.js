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
router.get('/', verifyToken, async (req, res) => { });

//Get all entrys of employee
router.get('/:emp_id', verifyToken, async (req, res) => {
    // TODO (get the all employee's entrys whose start_date is after )
});

//Update specific entry's exit time
router.get('/:emp_id/:entry_num', async (req, res) => {
    res.send("update hit!!");
});

router.put('/:emp_id/:entry_num', verifyToken, async (req, res) => {

    // getting emp_id and entry_num from url
    const emp_id = req.params.emp_id;
    const entry_num = req.params.entry_num;
    const exit_time = req.body.exit_time;

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

    // getting entry
    entry = entrys[entry_num]

    //editing entrys
    entry.exit_time = exit_time;

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

        res.status(200).json(modelEntry);

    } catch (err) {

        console.log("updation of User Entry failed");
        res.json(err.message);

    }
});

//Exporting Routes
module.exports = router;