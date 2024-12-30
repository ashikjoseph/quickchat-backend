const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, { timestamps: true })

const message = mongoose.model("message", messageSchema)
module.exports = message;