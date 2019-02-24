var express = require('express');
var router = express.Router();
const { adminController } = require('../controllers') 
const { auth } = require('../helpers/auth');
//catatan : 
// 1. authController tidak bisa diubah karena sudah di desctrucing
// 2. authController dari index.js controllers
// 3. '../controllers' ke index.js 


router.get('/getuserList', auth, adminController.getuserList)


module.exports = router;