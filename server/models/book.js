const mongo = require('mongoose');

const Schema = mongo.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongo.model('Book', bookSchema)