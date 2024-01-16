
const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    },
    content:{
        type: String,  
    },
    status:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = mongoose.model("Notification", NotificationSchema)