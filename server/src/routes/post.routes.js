// Import express and creates an express router
const express = require('express');
const router = express.Router();

// Import post controllers and auth middleware
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

// @router GET /post/creator
// @descri get posts by creator
// @access public
router.get('/creator', postController.getPostsByCreator);

// @router GET /post/
// @descri get posts by search query or tags
// @access public
router.get('/search', postController.getPostsBySearch);

// @router GET /post/
// @descri get all posts
// @access public
router.get('/', postController.getPosts);

// @router GET /post/
// @descri get post by id
// @access public
router.get(':id/', postController.getPost);

// @router POST /post/
// @descri create a post
// @access private
router.post('/', auth, postController.createPost);

// @router PATCH /post/
// @descri update a post
// @access private
router.patch('/:id', auth, postController.updatePost);

// @router DELETE /post/
// @descri delete a post
// @access private
router.delete('/:id', auth, postController.deletePost);

// @router PATCH /post/
// @descri like a post
// @access private
router.patch('/:id/likepost', auth, postController.likePost);

// @router POST /post/
// @descri post a comment
// @access public
router.post('/:id/commentPost', postController.commentPost);

// Exports router
module.exports = router;
