const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: String,
    last_name: {
        type: String,
        required: true
    },    
    email: {
        type: String, 
        required: true,
        index: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    member_status: Boolean,
    admin_status: Boolean
});

const User = mongoose.model('users', user_schema);

module.exports = User;