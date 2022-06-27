// Import required node modules
const { Types } = require('mongoose');

// Import post model and config
const Post = require('../models/post.model');
const config = require('../config/config');

// Create post controller
const postController = {};

// Get posts controller
postController.getPosts = async (req, res) => {
	const { page } = req.query;
	try {
		// Get starting index of every page
		const startIndex = (Number(page) - 1) * config.PAG.LIMIT;
		const totalPosts = await Post.countDocuments({});
		const posts = await Post.find().sort({ _id: -1 }).limit(config.PAG.LIMIT).skip(startIndex);
		const numPages = Math.ceil(totalPosts / config.PAG.LIMIT);
		return res
			.status(200)
			.json({ data: posts, currentPage: Number(page), numberOfPages: numPages });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Get posts by search controller
postController.getPostsBySearch = async (req, res) => {
	const { seachQuery, tags } = req.query;
	try {
		const title = new RegExp(seachQuery, 'i');
		const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
		return res.status(200).json({ data: posts });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Get post by creator controller
postController.getPostsByCreator = async (req, res) => {
	const { name } = req.body;
	try {
		const posts = await Post.find({ name });
		return res.status(200).json({ data: posts });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Get post controller
postController.getPost = async (req, res) => {
	const { id } = req.params;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	try {
		const post = await Post.findById(id);
		return res.status(200).json({ data: post });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Create post controller
postController.createPost = async (req, res) => {
	const post = req.body;
	try {
		const newPost = new Post({ ...post, creator: req.userId });
		await newPost.save();
		return res.status(200).json({ data: newPost });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Update post controller
postController.updatePost = async (req, res) => {
	const { id } = req.params;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	const { title, message, creator, file, tags } = req.body;
	try {
		const updatePost = {
			creator,
			title,
			message,
			tags,
			file,
			_id: id,
		};
		await Post.findByIdAndUpdate(id, updatePost, { new: true });
		return res.status(200).json({ data: updatePost });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Delete post controller
postController.deletePost = async (req, res) => {
	const { id } = req.params;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	try {
		await Post.findByIdAndRemove(id);
		return res.status(200).json({ msg: 'Post deleted successfully' });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Like post controller
postController.likePost = async (req, res) => {
	const { id } = req.params;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	if (!req.userId) {
		return res.status(404).json({ msg: 'User not authenticated' });
	}
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	try {
		const post = await Post.findById(id);
		const index = post.likes.findIndex((id) => {
			id === String(req.userId);
		});
		if (index === -1) {
			post.likes.push(req.userId);
		} else {
			post.likes = post.likes.filter((id) => {
				id !== String(req.userId);
			});
		}
		await post.update();
		return res.status(200).json({ data: post });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Comment post controller
postController.commentPost = async (req, res) => {
	const { id } = req.params;
	const { value } = req.body;
	if (!Types.ObjectId.isValid(id)) {
		return res.status(404).json({ msg: `No post with id ${id}` });
	}
	try {
		const post = await Post.findById(id);
		post.comments.push(value);
		await post.update();
		return res.status(200).json({ data: post });
	} catch (err) {
		// Print server error and return error msg
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Export post controller
module.exports = postController;
