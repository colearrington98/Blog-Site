const express = require('express');
const { Blog } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  // Fetch blog posts and render the homepage
});

router.get('/post/:id', async (req, res) => {
  // Fetch a single blog post and render the post page
});

module.exports = router;
