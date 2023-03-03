const jwt = require('jsonwebtoken')
const ApiErrors = require('../exceptions/apiErrors')
const TokenModel = require('./../model/tokenModel')

class TokenService {

    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN })

        return { accessToken, refreshToken }
    }

    async save(userID, refreshToken) {
        const tokenData = await TokenModel.findOne({ userID, refreshToken })

        const decodedToken = jwt.decode(refreshToken)
        const expiresAt = new Date(decodedToken.exp * 1000)

        if (!tokenData)
            return await TokenModel.create({ userID, refreshToken, expiresAt })

        tokenData.refreshToken = refreshToken
        tokenData.expiresAt = expiresAt

        return tokenData.save()
    }

    async delete(refreshToken) {
        const refreshTokenDB = await TokenModel.deleteOne({ refreshToken })

        return refreshTokenDB
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

            return userData
        }
        catch {
            return null
        }
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

            return userData
        }
        catch {
            return null
        }
    }

    async find(refreshToken) {
        const tokenDB = await TokenModel.findOne({ refreshToken })
        if (!tokenDB)
            throw ApiErrors.UnauthorizedError()

        return tokenDB
    }

}

module.exports = new TokenService()