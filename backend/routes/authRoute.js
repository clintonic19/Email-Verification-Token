const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth  } = require('../controllers/authController');
const verify = require('../middleware/verify');

router.post('/signup', signup) 
router.post('/login', login) 
router.post('/logout', logout) 

//VERIFICATION ROUTE
router.post("/verify", verifyEmail);

//FORGOT PASSWORD ROUTE
router.post("/forgot-password", forgotPassword);

//RESET PASSWORD ROUTE
router.post("/reset-password/:token", resetPassword);

router.get("/check", verify, checkAuth);

//EXPORT ROUTER
module.exports = router;