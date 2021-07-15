const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

// MongoDB will automatically create an Id for every file we add to the database

module.exports = mongoose.model('Book', bookSchema);