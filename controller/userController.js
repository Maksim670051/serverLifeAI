const cookie = require('cookie')
const UserDTO = require("../DTO/userDTO")
const ApiErrors = require("../exceptions/apiErrors")
const UserModel = require("../model/userModel")
const MailService = require("../service/mailService")
const TokenService = require("../service/tokenService")
const UserService = require("../service/userService")

class UserController {

    async register(req, res, next) {
        try {
            const { email, password } = req.body

            const { userDTO, activationLink } = await UserService.register(email, password)
            const tokens = TokenService.generate({ ...userDTO })
            await TokenService.save(userDTO.userID, tokens.refreshToken)
            await MailService.sendMail(userDTO.email, activationLink)

            res.setHeader('Set-Cookie', cookie.serialize('refreshToken', String(tokens.refreshToken), {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                secure: true
            }))
            return res.status(200).json({ accessToken: tokens.accessToken, user: { ...userDTO } })
        }
        catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const userDTO = await UserService.login(email, password)
            const tokens = TokenService.generate({ ...userDTO })
            await TokenService.save(userDTO.userID, tokens.refreshToken)

            res.setHeader('Set-Cookie', cookie.serialize('refreshToken', String(tokens.refreshToken), {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                secure: true
            }))
            return res.status(200).json({ accessToken: tokens.accessToken, user: { ...userDTO } })
        }
        catch (err) {
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '')

            await TokenService.delete(cookies.refreshToken)

            res.clearCookie('refreshToken')
            return res.status(200).json({ message: 'Успешный выход' })
        }
        catch (err) {
            next(err)
        }
    }

    async activation(req, res, next) {
        try {
            const activationLink = req.params.link

            await UserService.activation(activationLink)

            return res.status(200).json({ message: 'Аккаунт успешно активирован' })
        }
        catch (err) {
            next(err)
        }
    }

    async refresh(req, res, next) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '')

            if (!cookies.refreshToken)
                throw ApiErrors.UnauthorizedError()

            await TokenService.find(cookies.refreshToken)
            await TokenService.delete(cookies.refreshToken)
            const userData = TokenService.validateRefreshToken(cookies.refreshToken)
            if (!userData)
                throw ApiErrors.UnauthorizedError()

            const userDB = await UserModel.findById(userData.userID)
            const userDTO = new UserDTO(userDB)
            const tokens = TokenService.generate({ ...userDTO })
            await TokenService.save(userDTO.userID, tokens.refreshToken)

            res.setHeader('Set-Cookie', cookie.serialize('refreshToken', String(tokens.refreshToken), {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
                secure: true
            }))
            return res.status(200).json({ accessToken: tokens.accessToken, user: { ...userDTO } })
        }
        catch (err) {
            next(err)
        }
    }

    async getUser(req, res, next) {
        try {
            const users = await UserModel.find()
            return res.status(200).json({ users })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = new UserController()