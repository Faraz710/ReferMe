const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

module.exports = User = mongoose.model("user", user)