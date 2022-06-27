// Import required node modules
const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

// Import config
const config = require('../config/config');

// Create user schema
const userSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 128,
			trim: true,
		},
		name: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 128,
			trim: true,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			index: { unique: true },
			trim: true,
		},
		password: {
			type: Schema.Types.String,
			required: true,
			minlength: config.SEC.PASS_MIN,
			maxlength: config.SEC.PASS_MAX,
			trim: true,
		},
	},
	{ collection: 'User' }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

// Compare if password matches
userSchema.methods.comparePassword = async function(password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch ? isMatch : false;
};

// Export user schema
module.exports = model('User', userSchema);
