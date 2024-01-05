
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration'
    },
    caption: String,
    image: String,

}, {
    timestamps: true // This adds createdAt and updatedAt fields
});


const Post = mongoose.model('Post', PostSchema)
module.exports = Post