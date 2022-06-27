// Import express and creates an express router
const express = require('express');
const router = express.Router();

// Import user controllers
const userController = require('../controllers/user.controller');

// @router POST /user/signup
// @descri sign in as existing user
// @access public
router.post('/signin', userController.SignIn);

// @router POST /user/signup
// @descri sign up as a new user
// @access public
router.post('/signup', userController.SignUp);

// Exports router
module.exports = router;
