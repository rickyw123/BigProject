const router = require('express').Router();
const authControllers = require('./../controllers/authControllers');
const authMiddleware = require('./../middlewares/auth');

router.post('/register', authControllers.register); // panggil controller ketikla endpoint dari /register dipanggil , maka kita panggil register controller / function
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);

router.get('/me', authMiddleware.isAuthenticated, authControllers.getLoginData);

module.exports = router;