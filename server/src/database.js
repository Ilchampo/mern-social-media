// Import required node modulesx
const mongoose = require('mongoose');

// Import config
const config = require('./config/config');

// Connect to database
const connection = mongoose
	.connect(config.DB.URL)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.log(err.message);
		process.exit(1);
	});

// Export database connection
module.exports = connection;
