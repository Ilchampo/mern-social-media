// Import required node modules
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv path
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Create object with configs
const config = {
	APP: {
		PORT: process.env.PORT || 3000,
	},
	DB: {
		URL: process.env.URL,
	},
	SEC: {
		PASS_MIN: 8,
		PASS_MAX: 128,
		JWT_KEY: process.env.JWT_KEY,
		JWT_EXPIRE: '1 hour',
	},
	PAG: {
		LIMIT: 8,
	},
};

// Export config
module.exports = config;
