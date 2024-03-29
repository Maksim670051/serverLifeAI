const Router = require('express').Router
const AIController = require('../controller/aiController')
const BookmarkController = require('../controller/bookmarkController')
const RapidApiController = require('../controller/rapidApiController')
const UserController = require('../controller/userController')
const AuthMiddleware = require('../middleware/authMiddleware')
const BalanceMiddleware = require('../middleware/balanceMiddleware')
const router = new Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/bookmark', AuthMiddleware, BookmarkController.addBookmark)
router.post('/setRating', AuthMiddleware, AIController.estimate)

router.get('/refresh', UserController.refresh)
router.get('/activation/:link', UserController.activation)
router.get('/ai', AuthMiddleware, AIController.ai)
router.get('/bookmark', AuthMiddleware, BookmarkController.getBookmark)
router.get('/ai/rating', AuthMiddleware, AIController.getRatingAI)

router.delete('/bookmark/:aiID', AuthMiddleware, BookmarkController.removeBookmark)

// RapidApi
router.post('/searchChatBot', AuthMiddleware, BalanceMiddleware, RapidApiController.searchChatBot)

router.get('/createAI', AIController.createAI)

module.exports = router