const express = require('express');
const { Comment } = require('../models');
const router = express.Router();

router.post('/post/:id', async (req, res) => {  // Add a comment to a blog post and redirect back to the post
    await Comment.create({content:req.body.content, user_id:req.session.user.id, blog_id:req.params.id});
}),

router.post('/post/:id', isAuthenticated, async (req, res) => {
});

module.exports = router;
