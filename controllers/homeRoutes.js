const express = require('express');
const { Blog } = require('../models'); // Import the Blog model
const router = express.Router();

router.get('/', async (req, res) => {   // Fetch blog posts and render the homepage
    const posts = await Blog.findAll({include:'User'});
    res.render('homepage', {posts});
});

router.get('/post/:id', async (req, res) => {   // Fetch a single blog post and render the post page
    const post = await Blog.findOne({where:{id:req.params.id}, include:'User'});
    res.render('post', {post});
});

module.exports = router;
