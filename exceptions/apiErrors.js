module.exports = class ApiErrors extends Error {

    constructor(status, message, errors = []) {
        super(message)

        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors = []) {
        return new ApiErrors(400, message, errors)
    }

    static UnauthorizedError() {
        return new ApiErrors(401, 'Пользователь не авторизован')
    }

}