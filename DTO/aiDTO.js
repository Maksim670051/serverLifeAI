module.exports = class AIDTO {

    constructor(AIModel) {
        this.description = AIModel.description
        this.developer = AIModel.developer
        this.name = AIModel.name
        this.price = AIModel.price
        this.rating = AIModel.rating
        this.aiID = AIModel._id
    }

}