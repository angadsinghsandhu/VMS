//Getting Modules
const mongoose = require('mongoose');
const { string } = require('joi');
mongoose.set('useCreateIndex', true);

//creating schema of an Entry
const entrySchema = mongoose.Schema({
    name: { type: String, required: true },
    emp_id: { type: Number, required: true },
    active: { type: Boolean, default: true },
    visit_date: { type: String, default: Date.now },
    pass_id: { type: Number, default: 0 },
    accompany: { type: Number, required: true, default: 0 },
    entry_time: { type: String, default: null },
    exit_time: { type: String, default: null },
    remarks: { type: String, default: null },
    image: { type: String, required: true, default: null },
    // image: { data: Buffer, contentType: String },
});

// TODO (Add Image Capabilities)

//Exporting Model
module.exports = mongoose.model('entryModel', entrySchema);