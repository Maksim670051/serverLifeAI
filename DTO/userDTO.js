module.exports = class UserDTO {

    constructor(userModel) {
        this.userID = userModel._id
        this.email = userModel.email
        this.balance = userModel.balance
        this.isActivated = userModel.isActivated
    }

}