const express =require('express');
const router = express.Router();
const { login, register, me } = require('../controller/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/me', me);


module.exports = router;
