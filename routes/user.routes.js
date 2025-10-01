const express = require('express');
const { signup, login, getAllNews, getNewsById } = require('../controller/user.controller');

const router = express.Router();


//user
router.post('/signup', signup); 
router.post('/login', login); 

//news
router.get('/news', getAllNews);
router.get('/news/:id', getNewsById);


module.exports = router;