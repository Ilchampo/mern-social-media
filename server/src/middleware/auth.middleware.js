// Import required node module
const jwt = require('jsonwebtoken');

// Import config
const config = require('../config/config');

// Create local auth
const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isCustomAuth = token.length < 500;
		let data;
		if (token && isCustomAuth) {
			data = jwt.verify(token, config.SEC.JWT_KEY);
			req.userId = data?.id;
		} else {
			data = jwt.decode(token);
			req.userId = data?.sub;
		}
		next();
	} catch (err) {
		console.log(err.message);
	}
};

// Export module
module.exports = auth;
