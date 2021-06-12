const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const songSchema = new Schema({
    name: { type: String, required: true },
    singer: { type: String, required: true }
});

module.exports = mongoose.model('Song', songSchema);