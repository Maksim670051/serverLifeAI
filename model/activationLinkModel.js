const { Schema, model } = require('mongoose')

const ActivationLinkSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    activationLink: { type: String, required: true }
})

module.exports = model('ActivationLink', ActivationLinkSchema)