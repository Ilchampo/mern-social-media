// Import app and database
const app = require('./app');
const database = require('./database');

// Start app
app.listen(app.get('port'), () => {
	console.log(`App running on port ${app.get('port')}`);
});
