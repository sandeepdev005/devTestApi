const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    type: String,
    value: String,
    index: Number
});

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    userId:String,
    content: [contentSchema]
});

module.exports = mongoose.model('Blog', blogSchema);