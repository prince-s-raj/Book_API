const mongoose = require("mongoose");

// BOOK Schema
const BookSchema = mongoose.Schema({
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        authors: [Number],
        publications: [Number],
        category: [String]
});

// Creating BOOK Module
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;