// registerSchema.js

const mongoose = require('mongoose');

// Define the schema for user registration
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

// Create and export the Mongoose model
const User = mongoose.model('User', userSchema);
module.exports = User;
