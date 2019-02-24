var express = require('express');
var router = express.Router();
const { authController } = require('../controllers') 
//catatan : 
// 1. authController tidak bisa diubah karena sudah di desctrucing
// 2. authController dari index.js controllers
// 3. '../controllers' ke index.js 


router.post('/register', authController.register)
router.post('/signin', authController.signin)
router.post('/verified', authController.verified)

module.exports = router;
