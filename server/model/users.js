const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    course: {
        type: String
    },
    year: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel