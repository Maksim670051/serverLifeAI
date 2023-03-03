const { Schema, model } = require('mongoose')

const TokenSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true }
})

module.exports = model('Token', TokenSchema)