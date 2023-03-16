const BalanceService = require("../service/balanceService")

module.exports = async (req, res, next) => {
    try {
        const userID = req.user.userID
        const aiID = req.body.aiID

        const isEnoughFunds = await BalanceService.enoughFunds(userID, aiID)
        if (!isEnoughFunds)
            return res.status(402).json({ message: 'Недостаточно средств' })

        next()
    }
    catch (err) {
        next(err)
    }
}