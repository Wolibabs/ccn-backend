const express = require('express');
const router = express.Router();
const adminCtrl = require('../controller/admin.controller');
const { authenticate, authorize } = require('../utils/auth');


// Auth routes
router.post('/signup', adminCtrl.signup); // public (but you might restrict in production)
router.post('/login', adminCtrl.login); // public


// News management (secured)
router.post('/news', authenticate, authorize('editor'), adminCtrl.createNews);
router.put('/news/:id', authenticate, authorize('editor'), adminCtrl.editNews);
router.delete('/news/:id', authenticate, authorize('editor'), adminCtrl.deleteNews);


module.exports = router;