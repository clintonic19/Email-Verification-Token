const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyEmail  } = require('../controllers/authController');

router.post('/signup', signup) 
router.post('/login', login) 
router.post('/logout', logout) 

//VERIFICATION ROUTE
router.post("/verify-email", verifyEmail);



module.exports = router;