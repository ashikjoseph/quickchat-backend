
const chatController = require('../controllers/chatController')
const sendController=require('../controllers/sendController')

const { getUsers } = require('../controllers/userController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')

const express = require('express')

const router = new express.Router()


router.post('/chat/signup', chatController.signUp)
router.post('/chat/login',chatController.loginUser)
router.post('/chat/send/:id',jwtMiddleware,sendController.sendMessage)
router.get('/chat/receive/:id',jwtMiddleware,sendController.getMessage)
router.get('/chat/getusers',jwtMiddleware,getUsers)

module.exports = router;