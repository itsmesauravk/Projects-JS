const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'custom'],
    required: true,
  },
  profileImage: {
    type: String, // Assuming you store the image URL in the database
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
