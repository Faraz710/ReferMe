const express = require('express')
const router = express.Router()

//USER AUTH
const userController = require('../controllers/userController/auth')

router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router