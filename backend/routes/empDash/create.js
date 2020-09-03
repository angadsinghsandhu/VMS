//Getting Modules
const express = require('express');
const entryModel = require('../../model/entryModel');
const verifyToken = require('../../middleware/getAuthenticatedToken');
const userModel = require('../../model/userModel');
const {
  entryValidation
} = require('../../middleware/validation');

//Creating Router
const router = express.Router();


//CREATING CREATE ROUTES
//Init
router.get('/', verifyToken, async (req, res) => { });

//Creating New Entry 
router.post('/', verifyToken, async (req, res) => {
  //validating data
  const invalid = await entryValidation(req, res);
  if (invalid) {
    return res.status(400).send(invalid.details[0].message);
  }

  //getting a emp_id using auth-token
  try {
    emp_id = req.body.emp_id;
  } catch (err) {
    console.log("getting object fron auth-token failed");
    res.json(err.message);
  }

  //getting json information
  const entry = new entryModel({
    name: req.body.name,
    emp_id: req.body.emp_id,
    active: req.body.active,
    visit_date: req.body.visit_date,
    pass_id: req.body.pass_id,
    accompany: req.body.accompany,
  });

  //updating newly created entry
  try {

    const modelEntry = await userModel.updateOne({
      emp_id: emp_id
    }, {
      $push: {
        entrys: entry
      }
    }).catch(function (err, aff, res) {
      if (err != null) {
        console.log(err);
      } else {
        console.log(res);
      }
    });

    console.log("updation of User sucessful");
    res.json(modelEntry);

  } catch (err) {

    console.log("updation of User failed");
    res.json(err.message);

  }
});



//Exporting Routes
module.exports = router;
