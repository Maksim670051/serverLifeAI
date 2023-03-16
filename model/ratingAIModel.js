const { Schema, model } = require('mongoose')

const RatingAISchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    ratingAI: [{
        aiID: { type: Schema.Types.ObjectId, ref: 'AI' },
        rating: { type: Number }
    }]
})

module.exports = model('RatingAI', RatingAISchema)