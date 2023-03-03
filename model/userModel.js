const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: false },
    balance: { type: Number, required: true, default: 0 }
})

module.exports = model('User', UserSchema)