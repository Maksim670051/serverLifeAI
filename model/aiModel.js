const { Schema, model } = require('mongoose')

const AIShema = new Schema({
    name: { type: String, required: true },
    developer: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    countRating: { type: Number, default: 0 }
})

module.exports = model('AI', AIShema)