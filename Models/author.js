const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age:Number,
});
//Model refers to collection
module.exports = mongoose.model('Author',authorSchema);