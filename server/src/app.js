// Import required node modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import config
const config = require('./config/config');

// Create an express app
const app = express();

// Configure app
app.set('port', config.APP.PORT);

// Configure app middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json({ extended: true, limit: '30mb' }));
app.use(cors());

// Load app routes
app.use('/posts', require('./routes/post.routes'));
app.use('/user', require('./routes/user.routes'));

// Export express app
module.exports = app;
