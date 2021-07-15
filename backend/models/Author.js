const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
})

// MongoDB will automatically create an Id for every file we add to the database

module.exports = mongoose.model('Author', authorSchema);