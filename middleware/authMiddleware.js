const ApiErrors = require("../exceptions/apiErrors")
const TokenService = require("../service/tokenService")

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader)
            throw ApiErrors.UnauthorizedError()

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken)
            throw ApiErrors.UnauthorizedError()

        const userData = TokenService.validateAccessToken(accessToken)
        if (!userData)
            throw ApiErrors.UnauthorizedError()

        req.user = userData
        next()
    }
    catch (err) {
        next(err)
    }
}