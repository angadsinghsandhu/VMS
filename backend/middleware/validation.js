//Getting Modules
const Joi = require('joi')

//VALIDATION
const signupValidation = (req, res) => {
    //Creating Validation Schema
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        emp_id: Joi.number().required(),
        level: Joi.string().valid('emp', 'mgt', 'grd'),
        email: Joi.string().email().min(3).max(100).required(),
        password: Joi.string().min(8).max(50).required(),
        contact_info: Joi.string().length(10),
        entrys: Joi.array()
    });

    //validating data
    const {
        error
    } = schema.validate(req.body);
    return error

};

const loginValidation = (req, res) => {
    //Creating Validation Schema
    const schema = Joi.object({
        emp_id: Joi.number().required(),
        password: Joi.string().min(8).max(50).required()
    });

    //validating data
    const {
        error
    } = schema.validate(req.body);
    return error;

};

const entryValidation = (req, res) => {
    //Creating Validation Schema
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        emp_id: Joi.number().required(),
        active: Joi.boolean().default(true),
        visit_date: Joi.string().min(8).max(20).default(Date.now()),
        pass_id: Joi.number().default(null),
        accompany: Joi.number().default(1),
        entry_time: Joi.string().default(null),
        exit_time: Joi.string().default(null),
        remarks: Joi.string().default(null),
        image: Joi.any().default(null)
    });

    //validating data
    const {
        error
    } = schema.validate(req.body);
    return error;

};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.entryValidation = entryValidation;
