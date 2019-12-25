const mongoose = require("mongoose");

const MediaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mediaType: String,
    mediaName: String,
    path: String,
    userId: String,
});

module.exports = mongoose.model('Media',MediaSchema);