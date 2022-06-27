// Import required node modules
const { model, Schema } = require('mongoose');

// Create post message schema
const postSchema = new Schema(
	{
		title: {
			type: Schema.Types.String,
			required: true,
			minlength: 8,
			maxlength: 256,
		},
		message: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 512,
		},
		name: {
			type: Schema.Types.String,
			required: true,
			minlength: 2,
			maxlength: 256,
		},
		creator: {
			type: Schema.Types.String,
			required: true,
		},
		tags: [
			{
				type: Schema.Types.String,
				required: true,
				minlength: 2,
				maxlength: 32,
			},
		],
		selectedFile: {
			type: Schema.Types.String,
			required: true,
		},
		likes: {
			type: [Schema.Types.String],
			required: false,
			default: []
		},
		comments: [
			{
				type: [Schema.Types.String],
				required: false,
				default: []
			},
		],
		createdAt: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now(),
		},
	},
	{ collection: 'Post' }
);

// Export post schema
module.exports = model('Post', postSchema);
