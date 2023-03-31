const express = require('express'); // Import the express package
const { Comment } = require('../models'); // Import the Comment model
const router = express.Router(); // Create a router object
const isAuthenticated = require('../utils/auth'); // Import the isAuthenticated function

router.post('/post/:id', async (req, res) => {  // Add a comment to a blog post and redirect back to the post
    await Comment.create({content:req.body.content, user_id:req.session.user.id, blog_id:req.params.id}); // Create a new comment
}), // Redirect back to the post

router.post('/post/:id',isAuthenticated, async (req, res) => { // Add a comment to a blog post and redirect back to the post
}); // Redirect back to the post


module.exports = router;
