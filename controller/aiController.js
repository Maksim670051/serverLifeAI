const ApiErrors = require("../exceptions/apiErrors")
const aiModel = require("../model/aiModel")
const AIService = require("../service/aiService")

class AIController {

    async ai(req, res, next) {
        try {
            const aiDTOList = await AIService.getAI()

            return res.status(200).json({ ai: aiDTOList })
        }
        catch (err) {
            next(err)
        }
    }

    async createAI(req, res, rext) {
        try {
            const json = {
                name: 'Преобразование текста в речь',
                developer: 'Yandex Cloud',
                description: 'Быстрое преобразование текста в аудио, поддержка более 100 языков и более 300 динамиков',
                price: 0.27
            }
            await aiModel.create({ ...json })

            return res.status(200).json({ status: 200 })
        }
        catch (err) {
            next(err)
        }
    }

    async findAI(req, res, next) {
        try {
            const listAI = req.body.listAI

            const aiDTOList = await AIService.findAI(listAI)

            return res.status(200).json({ ai: aiDTOList })
        }
        catch (err) {
            next(err)
        }
    }

    async setRating(req, res, next) {
        try {
            const { aiID, rating } = req.body
            const userID = req.user.userID

            const ratingUser = await AIService.getRatingAI(userID, aiID)
            let newRating
            if (!ratingUser) {
                await AIService.setRatingAI(userID, aiID, rating)
                await AIService.addCountRating(aiID)
                newRating = await AIService.recalculateRating(aiID, rating)
                return res.status(200).json({ newRating })
            }
            await AIService.updateRatingAI(userID, aiID, rating)
            newRating = await AIService.recalculateRating(aiID, rating, ratingUser)

            return res.status(200).json({ rating: newRating })
        }
        catch (err) {
            next(err)
        }
    }

    async getRatingAI(req, res, next) {
        try {
            const userID = req.user.userID

            const ratingAI = await AIService.getRatingAIUser(userID)

            return res.status(200).json({ ratingAI })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = new AIController()