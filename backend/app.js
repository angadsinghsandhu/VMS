//Getting Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MethodOverride = require('method-override');
require('dotenv/config');


//Creating Express Variable
app = express();

//Importing Routes
//main
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
// emplpoyee
const empRoute = require('./routes/empDash/empDash');
const createRoute = require('./routes/empDash/create');
const editRoute = require('./routes/empDash/edit');
// guard
const guardRoute = require('./routes/guardDash/guardDash');
const entryRoute = require('./routes/guardDash/entry');
const exitRoute = require('./routes/guardDash/exit');
const checkRoute = require('./routes/guardDash/check');
// management
const dashboardRoute = require('./routes/dashboard/dashboard');

// CONNECTING TO DATABASE //
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB!!")
  }).catch((err) => {
    console.log("Error occured in connecting to DB")
    console.log(err.message)
  })

// CREATING MIDDLEWARE //
// (functions that execute when certain links/routes are hit) 

// Body Parse Middleware to access req and res
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// Using cors package to allow cross-platform data distribution
app.use(cors());
// using method-override to specify using a query string for delete request
// app.use(MethodOverride('_method'));

// CREATING ROUTES //
//Home
app.use('/', homeRoute);
//Auth
app.use('/auth', authRoute);
//Employee
app.use('/empDash', empRoute);
app.use('/empDash/create', createRoute);
app.use('/empDash/edit', editRoute);
//Guard
app.use('/guardDash', guardRoute);
app.use('/guardDash/entry', entryRoute);
app.use('/guardDash/exit', exitRoute);
app.use('/guardDash/check', checkRoute);
//Management
app.use('/dashboard', dashboardRoute);

//start listining or boot-up srever
app.listen(3000);
