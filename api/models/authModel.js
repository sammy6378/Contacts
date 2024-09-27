const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const authModel = mongoose.model('users', authSchema);
module.exports = authModel;