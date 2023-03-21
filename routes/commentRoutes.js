const express = require('express');
const { Comment } = require('../models');
const router = express.Router();

router.post('/post/:id', async (req, res) => {
  // Add a comment to a blog post and redirect back to the post
});

module.exports = router;
