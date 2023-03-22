const axios = require("axios")
const ApiErrors = require("../exceptions/apiErrors")
const BalanceService = require("../service/balanceService")

class RapidApiController {

    async searchChatBot(req, res, next) {
        const options = {
            method: 'POST',
            url: 'https://you-chat-gpt.p.rapidapi.com/TextOnly',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
                'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
            },
            data: '{"question":"курс доллора по отношению к рублю","max_response_time":60}'
        }

        axios.request(options)
            .then(async (response) => {
                if (response.data.warning)
                    next(ApiErrors.BadRequest('Ошибка запроса'))
                const userID = req.user.userID
                const aiID = req.body.aiID
                const balance = await BalanceService.debitingFunds(userID, aiID)
                return res.status(200).json({ balance, data: response.data })
            }
            ).catch((error) => {
                next(ApiErrors.BadRequest('Ошибка запроса', [error]))
            })
    }

}

module.exports = new RapidApiController()