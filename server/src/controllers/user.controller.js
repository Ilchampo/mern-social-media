// Import required node modules
const jwt = require('jsonwebtoken');
const v = require('validator');

// Import user model and cofig
const User = require('../models/user.model');
const config = require('../config/config');

// Create user controller
const userController = {};

// Create token
const createToken = (user) => {
	const token = jwt.sign(
		{
			email: user.email,
			id: user._id,
		},
		config.SEC.JWT_KEY,
		{ expiresIn: config.SEC.JWT_EXPIRE }
	);
	return token;
};

// Sign in controller
userController.SignIn = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	if (!v.isEmail(email)) {
		return res.status(400).json({ msg: 'Please enter a valid email' });
	}
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ msg: 'User not found' });
		}
		if (!user.comparePassword(password)) {
			return res.status(400).json({ msg: 'Incorrect password' });
		}
		const token = createToken(user);
		return res.status(200).json({ result: user, token });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Sign up controller
userController.SignUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	if (!v.isAlpha(firstName) || !v.isAlpha(lastName) || !v.isEmail(email)) {
		return res.status(400).json({ msg: 'Please enter valid values for the fields' });
	}
	try {
		let user = await User.findOne({ email })
			.select(['-firstName', '-lastName', '-password', '-created', '-enable'])
			.lean();
		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		user = new User({ name: `${firstName} ${lastName}`, email, password });
		await user.save();
		const token = createToken(user);
		return res.status(200).json({ result: user, token });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Export user controller
module.exports = userController;
