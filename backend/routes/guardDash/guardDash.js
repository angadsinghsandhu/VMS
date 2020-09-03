//Getting Modules
const express = require('express');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const entryModel = require('../../model/entryModel');
const userModel = require('../../model/userModel');
const {
    entryValidation
} = require('../../middleware/validation');
const { query } = require('express');
const { parse } = require('path');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', verifyToken, async (req, res) => {
    res.send('at guard dash')
})

router.put('/', verifyToken, async (req, res) => {
    //getting a emp_id using auth-token
    const visit_object = await req.body.date;
    const visit_date = (visit_object.year + '-' + visit_object.month + '-' + visit_object.date).toString()

    var query = {
        "entrys": {
            "$elemMatch": {}
        }
    }

    query["entrys"]["$elemMatch"]["visit_date"] = visit_date;
    // var query = JSON.stringify($date_query)
    // query = JSON.parse(query)

    const users = await returnUser(query);

    entrysToday = []

    for (let userIndex in users) {
        for (let entryIndex in users[userIndex].entrys) {
            if (users[userIndex].entrys[entryIndex].visit_date == visit_date) {
                users[userIndex].entrys[entryIndex]["index"] = entryIndex;
                entrysToday.push(users[userIndex].entrys[entryIndex]);
            }
        }
    }

    res.status(200).json(entrysToday);
});

async function returnUser(query) {
    try {
        const users = await userModel.find(query);
        return users;
    } catch (err) {
        console.log(` failed to get guard object, error : ${err}`);
        return;
    }
}

//Exporting Routes
module.exports = router;