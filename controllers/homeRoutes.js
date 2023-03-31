const express = require('express');
const { Blog, User } = require('../models'); // Import the Blog model
const router = express.Router();

router.get('/', async (req, res) => {   // Fetch blog posts and render the homepage
    const posts = await Blog.findAll(); // look into this later
    //res.render('homepage', {posts});
    res.render('homepage');
});

router.get('/post/:id', async (req, res) => {   // Fetch a single blog post and render the post page
    const post = await Blog.findOne({where:{id:req.params.id}, include:'User'});
    res.render('post', {post});
});

module.exports = router;
