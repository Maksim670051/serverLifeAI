const Router = require('express').Router
const UserController = require('../controller/userController')
const AuthMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

router.get('/refresh', UserController.refresh)
router.get('/activation/:link', UserController.activation)
router.get('/users', AuthMiddleware, UserController.getUser)

module.exports = router