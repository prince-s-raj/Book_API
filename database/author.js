const mongoose = require("mongoose");

// AuthorSchema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

// Creating Author Module
const AuthorModel = mongoose.model("authors",AuthorSchema);
module.exports = AuthorModel;