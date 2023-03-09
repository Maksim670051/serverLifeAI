const AIModel = require("../model/aiModel")
const AIDTO = require('./../DTO/aiDTO')

class AIService {

    async getAI() {
        const aiList = await AIModel.find()

        const aiDTOList = aiList.map((ai) => new AIDTO(ai))

        return aiDTOList
    }

    async findAI(listAI) {
        const aiList = await AIModel.find({ _id: { $in: listAI } })

        const aiDTOList = aiList.map((ai) => new AIDTO(ai))

        return aiDTOList
    }

}

module.exports = new AIService()