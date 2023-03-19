const AIModel = require("../model/aiModel")
const AIDTO = require('./../DTO/aiDTO')
const RatingAIModel = require('../model/ratingAIModel')

class AIService {

    async getAI() {
        const aiList = await AIModel.find()

        const aiDTOList = aiList.map((ai) => new AIDTO(ai))

        return aiDTOList
    }

    async getRatingAI(userID, aiID) {

        const ratingDB = await RatingAIModel.findOne({ userID })

        if (!ratingDB)
            return null

        const fingRating = ratingDB.ratingAI.map((item) => {
            if (item.aiID == aiID)
                return item.rating
        })

        if (fingRating.length !== 0)
            return fingRating[0]

        return null
    }

    async setRatingAI(userID, aiID, rating) {
        const ratingAI = await RatingAIModel.findOne({ userID })

        ratingAI.ratingAI.push({ aiID, rating })
        await ratingAI.save()
    }

    async updateRatingAI(userID, aiID, rating) {
        const ratingAI = await RatingAIModel.findOne({ userID })

        ratingAI.ratingAI.map((item) => {
            if (item.aiID == aiID)
                item.rating = rating
        })

        await ratingAI.save()
    }

    async addCountRating(aiID) {
        const aiDB = await AIModel.findOne({ aiID })

        aiDB.countRating += 1
        await aiDB.save()
    }

    async recalculateRating(aiID, newRating, preRating = 0) {
        const aiDB = await AIModel.findOne({ aiID })

        let rating
        if (preRating === 0)
            rating = (aiDB.rating * (aiDB.countRating - 1) - preRating + newRating) / aiDB.countRating
        else
            rating = (aiDB.rating * aiDB.countRating - preRating + newRating) / aiDB.countRating

        aiDB.rating = rating
        await aiDB.save()

        return rating
    }

    async getRatingAIUser(userID) {
        const ratingAIDB = await RatingAIModel.findOne({ userID })

        return ratingAIDB.ratingAI
    }

}

module.exports = new AIService()