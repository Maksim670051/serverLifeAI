const aiModel = require("../model/aiModel")
const userModel = require("../model/userModel")

class BalanceService {

    async enoughFunds(userID, aiID) {
        const userDB = await userModel.findById(userID)
        const aiDB = await aiModel.findById(aiID)

        if ((userDB.balance - aiDB.price) >= 0)
            return true
        return false
    }

    async debitingFunds(userID, aiID) {
        const userDB = await userModel.findById(userID)
        const aiDB = await aiModel.findById(aiID)

        userDB.balance = userDB.balance - aiDB.price
        await userDB.save()

        return userDB.balance
    }

}

module.exports = new BalanceService()