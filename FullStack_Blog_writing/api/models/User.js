const mongoose = require("mongoose")
const { Schema, model } = mongoose
//instead of moongose.Schema({})

const userSchema = new Schema({
  username: { type: String, unique: true, min: 4, required: true },
  password: { required: true, type: String },
})

const userModel = model("User", userSchema)

module.exports = userModel
