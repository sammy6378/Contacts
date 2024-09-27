const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const contactModel = mongoose.model('contacts', contactSchema);
module.exports = contactModel;