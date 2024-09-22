const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({

})

const contactModel = mongoose.model('contacts', contactSchema);
module.exports = contactModel;