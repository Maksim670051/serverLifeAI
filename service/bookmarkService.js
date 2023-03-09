const BookmarkModel = require("../model/bookmarkModel")

class BookmarkService {

    async addBookmark(userID, aiID) {
        const bookmarkDB = await BookmarkModel.findOne({ userID })

        if (bookmarkDB.ai.indexOf(aiID) !== -1)
            return bookmarkDB

        bookmarkDB.ai.push(aiID)

        return bookmarkDB.save()
    }

    async getBookmark(userID) {
        const bookmarkDB = await BookmarkModel.findOne({ userID })

        return bookmarkDB
    }

    async removeBookmark(userID, aiID) {
        const bookmarkDB = await BookmarkModel.findOne({ userID })

        const aiIDDB = bookmarkDB.ai.indexOf(aiID)
        if (aiIDDB !== -1)
            bookmarkDB.ai.splice(aiIDDB, 1)

        return bookmarkDB.save()
    }

}

module.exports = new BookmarkService()