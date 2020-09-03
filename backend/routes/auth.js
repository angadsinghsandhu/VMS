//Getting Modules
const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const {
  loginValidation,
  signupValidation
} = require('../middleware/validation');

//Creating Router
const router = express.Router();

//CREATING CREATE ROUTES
//Init
router.get('/signup', async (req, res) => {
  // TODO (Create Cookie containing details {emp_id})
  res.json("signup page");
});

//Signup
router.post('/signup', async (req, res) => {
  //validating data
  const invalid = signupValidation(req, res);
  if (invalid) {
    return res.status(400).sendStatus(
      invalid.details[0].message
    );
  }

  //checking uniqueness
  const userExist = await userModel.findOne({
    email: req.body.email,
    emp_id: req.body.emp_id
  });
  if (userExist) {
    return res.status(400).json("Email Or Employee ID Already Exists");
  }

  //hashing password
  const salt = await bcrypt.genSalt(10); //setting complexity
  const hashPassword = await bcrypt.hash(req.body.password, salt) //Hashing

  //getting json information
  const user = new userModel({
    name: req.body.name,
    emp_id: req.body.emp_id,
    level: req.body.level,
    email: req.body.email,
    password: hashPassword,
    contact_info: req.body.contact_info,
    entrys: []
  });

  //handling newly created entry
  try {
    //saving user
    const savedUser = await user.save();
    // promise created!!
    res.status(201).json(savedUser); // User Created !!
  } catch (err) {
    console.log("user creation failed : ");
    res.status(400).send(
      err
    );
  }
});

//Login
router.post('/login', async (req, res) => {
  //validating data
  const invalid = loginValidation(req, res);
  if (invalid) {
    return res.status(400).send(invalid.details[0].message);
  }

  //checking existance of entered information
  const user = await userModel.findOne({
    emp_id: req.body.emp_id
  });
  if (!user) {
    return res.status(400).json("Email Or Employee ID Does Not Exists");
  }

  // comparing passwords
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json('Invalid Password');
  } else {

    //creating token
    const token = jwt.sign({
      emp_id: user.emp_id
    }, process.env.JWT_KEY)

    //adding token to header
    res.status(200).header('token', token).json({
      token: token,
      user: user
    });
  }
});

// emp_id list
router.get('/idList', async (req, res) => {
  //checking existance of entered information
  const users = await userModel.find();
  if (!users) {
    return res.status(400).json("Email Or Employee ID Does Not Exists");
  }

  // creating array of emp_ids
  ids = []
  for (let userIndex in users) {
    ids.push(users[userIndex].emp_id.toString())
  }

  // sending back ids
  res.status(200).json(ids);
});


//Exporting Routes
module.exports = router;
