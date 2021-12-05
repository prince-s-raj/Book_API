const mongoose = require("mongoose");

// PublicationSchema
const PublicationSchema = mongoose.Schema({
        id: Number,
        name: String,
        books: [String]
});

// Creating Publication Module
const PublicationModel = mongoose.model("publications",PublicationSchema);
module.exports = PublicationModel;