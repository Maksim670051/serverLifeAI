const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require('./../model/userModel')
const UserDTO = require('./../DTO/userDTO')
const ApiErrors = require('../exceptions/apiErrors')
const ActivationLinkModel = require('../model/activationLinkModel')
const BookmarkModel = require('../model/bookmarkModel')

class UserService {

    async register(email, password) {
        const user = await UserModel.findOne({ email })
        if (user)
            throw ApiErrors.BadRequest('Пользователь с таким email уже существует')

        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_HASH_PASSWORD))
        const activationLink = uuid.v4()

        const userModel = await UserModel.create({ email, password: hashPassword })
        const userDTO = new UserDTO(userModel)
        const activationLinkModel = await ActivationLinkModel.create({ userID: userDTO.userID, activationLink })
        await BookmarkModel.create({ userID: userDTO.userID, ai: [] })

        return { userDTO, activationLink: activationLinkModel.activationLink }
    }

    async login(email, password) {
        const userDB = await UserModel.findOne({ email })
        if (!userDB)
            throw ApiErrors.BadRequest('Неверный email/пароль')
        const isPassEquals = await bcrypt.compare(password, userDB.password)
        if (!isPassEquals)
            throw ApiErrors.BadRequest('Неверный email/пароль')

        const userDTO = new UserDTO(userDB)

        return userDTO
    }

    async activation(activationLink) {
        const activationLinkDB = await ActivationLinkModel.findOne({ activationLink })
        if (!activationLinkDB)
            throw ApiErrors.BadRequest('Некорректная ссылка активации')

        const userDB = await UserModel.findById(activationLinkDB.userID)
        userDB.isActivated = true
        await userDB.save()
        await ActivationLinkModel.deleteOne({ activationLink })
    }

}

module.exports = new UserService()