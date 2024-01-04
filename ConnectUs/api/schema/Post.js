
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    caption: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    


})