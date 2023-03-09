const ApiErrors = require("../exceptions/apiErrors")
const BookmarkService = require("../service/bookmarkService")

class BookmarkController {

    async addBookmark(req, res, next) {
        try {
            const userID = req.user.userID
            const { aiID } = req.body

            const bookmark = await BookmarkService.addBookmark(userID, aiID)
            if (!bookmark)
                throw ApiErrors.BadRequest('Ошибка')

            return res.status(200).json({ bookmark: bookmark.ai })
        }
        catch (err) {
            next(err)
        }
    }

    async getBookmark(req, res, next) {
        try {
            const userID = req.user.userID

            const bookmark = await BookmarkService.getBookmark(userID)
            if (!bookmark)
                throw ApiErrors.BadRequest('Ошибка')

            return res.status(200).json({ bookmark: bookmark.ai })
        }
        catch (err) {
            next(err)
        }
    }

    async removeBookmark(req, res, next) {
        try {
            const userID = req.user.userID
            const aiID = req.params.aiID

            const bookmark = await BookmarkService.removeBookmark(userID, aiID)
            if (!bookmark)
                throw ApiErrors.BadRequest('Ошибка')

            return res.status(200).json({ bookmark: bookmark.ai })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = new BookmarkController()