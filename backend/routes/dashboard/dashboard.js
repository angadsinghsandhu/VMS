//Getting Modules
const express = require('express');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const entryModel = require('../../model/entryModel');
const userModel = require('../../model/userModel');
const {
    loginValidation,
    signupValidation,
    entryValidation
} = require('../../middleware/validation');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', async (req, res) => {
    res.send("this is dashboard");
})

router.put('/', verifyToken, async (req, res) => {

    type = req.body.type;

    if (type == 'id') {
        emp_id = req.body.emp_id;

        query = { emp_id: emp_id }

    } else if (type == 'date') {
        date = req.body.visit_date.toString();

        var query = {
            "entrys": {
                "$elemMatch": {}
            }
        }

        query["entrys"]["$elemMatch"]["visit_date"] = date;
    } else {
        res.status(500).json("type not found");
    }


    // Getting User
    try {
        const users = await userModel.find(query)
            .catch(function (err) {
                console.log(`Failed to find user, error : ${err}`);
            });

        // date search responce
        if (type == 'date') {

            entryList = [];

            for (let userIndex in users) {
                for (entryIndex in users[userIndex].entrys) {
                    if (users[userIndex].entrys[entryIndex].visit_date == date) {
                        users[userIndex].entrys[entryIndex].index = entryIndex;
                        entryList.push(users[userIndex].entrys[entryIndex]);
                    }
                }
            }

            entrys = {
                entrys: entryList
            }

            res.status(200).json(entrys);

        } else {

            for (entryIndex in users[0].entrys) {
                users[0].entrys[entryIndex].index = entryIndex;
            }

            res.status(200).json(users[0]);
        }

    } catch (err) {
        console.log(`Failed to retrieve user, error : ${err.message}`);
    }

});

// Delete Employee
router.delete('/user/:emp_id', verifyToken, async (req, res) => {
    emp_id = req.params.emp_id

    try {
        // deleting a user
        await userModel.deleteOne(
            { emp_id: emp_id }
        )

        // sending responce
        res.status(200).json("User Deleted")
    } catch (err) {
        res.status(409).json("error occured in deleting user");
    }

});

// Update Employee Data
router.put('/user/:emp_id', verifyToken, async (req, res) => {
    emp_id = req.params.emp_id
});

// Delete Entry
router.delete('/entry/:emp_id/:entry_num', verifyToken, async (req, res) => {
    emp_id = req.params.emp_id
    entry_num = req.params.entry_num

    try {
        // getting all users
        const user = await userModel.findOne(
            { emp_id: emp_id }
        )

        if (!user) {
            res.status(404).json("user not found");
        }

        // getting entrys
        entrys = user.entrys

        // shifting/deleting entry
        for (let entryIndex in entrys) {
            if (entryIndex > entry_num) {
                entrys[entryIndex - 1] = entrys[entryIndex]
            }
        }
        entrys.pop(); //removing last element

        // FIXME (delete image too when deleting entry)

        // updating user
        await userModel.updateOne(
            { "emp_id": emp_id }, // Filter
            { "entrys": entrys } // Update
        )
            .then((obj) => {
                // sending responce
                res.status(200).json("Entry Deleted")
            })

    } catch (err) {
        res.status(409).json("error occured in deleting Entry");
    }
});

// Update Entry Data
router.put('/entry/:emp_id/:entry_num', verifyToken, async (req, res) => {
    emp_id = req.params.emp_id
    entry_num = req.params.entry_num
});

//Exporting Routes
module.exports = router;