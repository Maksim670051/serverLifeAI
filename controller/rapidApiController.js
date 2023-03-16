const { default: axios } = require("axios")
const ApiErrors = require("../exceptions/apiErrors")
const BalanceService = require("../service/balanceService")

class RapidApiController {

    async textGeneration(req, res, next) {

        const options = {
            method: 'GET',
            url: 'https://text-generation-api.p.rapidapi.com/api/v1/generate_text',
            params: { init_text: req.body.text },
            headers: {
                'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
                'X-RapidAPI-Host': 'text-generation-api.p.rapidapi.com'
            }
        }

        axios.request(options)
            .then(async (response) => {
                try {
                    const userID = req.user.userID
                    const aiID = req.body.aiID

                    if (response.data.status !== "success")
                        throw ApiErrors.BadRequest('Ошибка запроса')

                    const balance = await BalanceService.debitingFunds(userID, aiID)

                    return res.status(200).json({ balance, ...response.data })
                }
                catch (err) {
                    next(err)
                }
            })
            .catch((error) => {
                try {
                    throw ApiErrors.BadRequest('Ошибка запроса')
                }
                catch (err) {
                    next(err)
                }
            })

    }

}

module.exports = new RapidApiController()