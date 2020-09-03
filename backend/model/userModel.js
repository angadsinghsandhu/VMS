//Getting Modules
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

//creating schema of an Employee
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    emp_id: { type: Number, required: true, unique: true },
    level: { type: String, default: 'emp' }, //can be: 'emp', 'mgt', 'grd'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_info: { type: String, default: null, required: true },
    entrys: { type: Array, default: [] }
});

// TODO (Add Image Capabilities)

//Exporting Model
module.exports = mongoose.model('userModel', userSchema);
