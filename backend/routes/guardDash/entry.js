//Getting Modules
const express = require('express');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const userModel = require('../../model/userModel');
const multerImage = require('../../middleware/multerImage');
const path = require('path');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', verifyToken, async (req, res) => {
    res.send("guard-dash entry port");
});

//Get all entrys
router.get('/:emp_id', verifyToken, async (req, res) => {
    //getting specific emp_id
    emp_id = req.params.emp_id;

    // getting all users
    const users = await userModel.findOne(
        { emp_id: emp_id }
    )
    entrys = users.entrys.reverse()
    // TODO (publish entrys on frontend list)
});

//Get image to show
router.get('/image/:img', async (req, res) => {
    // Access the provided 'page' and 'limt' query parameters
    let img = req.params.img;
    let imgPath = `../../assets/${img}`

    const imgUrlPath = path.join(__dirname, imgPath)

    res.sendFile(imgUrlPath);
});

//post and save image to show
router.post('/image/:emp_id/:entry_num', multerImage, async (req, res) => {
    const file = req.file
    if (file) {
        res.status(200).json("image added");
    } else {
        res.status(500).json("image problem");
    }
})

//Update specific entry
router.put('/', verifyToken, async (req, res) => {

    const entryUpdate = req.body;

    // Getting User
    try {
        user = await userModel.findOne({
            emp_id: entryUpdate.emp_id
        }).catch(function (err) {
            console.log(`Failed to find user, error : ${err}`);
        })
    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }

    //getting the array of entrys
    entrys = user.entrys;

    //getting specific entry and updating
    entry_num = entryUpdate.entry_num;

    // getting entry
    entry = entrys[entry_num]

    //editing entrys
    entry.accompany = entryUpdate.accompany;
    entry.pass_id = entryUpdate.pass_id;
    entry.entry_time = entryUpdate.entry_time;
    entry.image = entryUpdate.image;
    entry.remarks = entryUpdate.remarks;
    entry.active = false;

    // Creating the $set object dynamically beforehand.
    //eg: $set => { $set: { "entrys.0": {//entry object//}} }
    var $set = { $set: {} };
    $set.$set['entrys.' + entry_num] = entry;

    //updating newly created entry
    try {
        const modelEntry = await userModel.updateOne({
            emp_id: entryUpdate.emp_id
        }, $set
        ).catch(function (err, aff, res) {
            if (err != null) {
                console.log(err);
            } else {
                console.log(res);
            }
        });

        console.log("updation of User Entry sucessful");
        res.status(200).json(modelEntry);

    } catch (err) {

        console.log("updation of User Entry failed");
        res.json(err.message);

    }
});

//Exporting Routes
module.exports = router;