const { Schema, model } = require('mongoose')

const BookmarkSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    ai: [String]
})

module.exports = model('Bookmark', BookmarkSchema)