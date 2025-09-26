const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');

//user
router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login); 

//news
router.get('/news', userCtrl.getAllNews);
router.get('/news/:id', userCtrl.getNewsById);


module.exports = router;