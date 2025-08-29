const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    number: { type: String, required: true, unique: true, },
    description: String,
    date: Date,
    time: String,
});

module.exports = mongoose.model("User", userSchema);