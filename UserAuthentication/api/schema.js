const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    picture : {type:String},
    username: { type: String,unique:true, required: true , min:4},
    password: { type: String, required: true, min:6}
});


const User = mongoose.model("User", userSchema);

module.exports = User