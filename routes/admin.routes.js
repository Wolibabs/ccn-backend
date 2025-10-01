const express = require('express');
const { signup, login, createNews, editNews, deleteNews } = require('../controller/admin.controller');
const { authenticate, authorize } = require('../utils/auth');

const router = express.Router();

// Auth routes
router.post('/signup', signup); // public (but you might restrict in production)
router.post('/login', login); // public


// News management (secured)
router.post('/news', authenticate, authorize('editor'), createNews);
router.put('/news/:id', authenticate, authorize('editor'), editNews);
router.delete('/news/:id', authenticate, authorize('editor'), deleteNews);


module.exports = router;