const express = require('express');
const { Blog } = require('../models');
const isAuthenticated = require('../utils/auth');
const router = express.Router();

router.get('/dashboard', async (req, res) => {  // Fetch the user's blog posts and render the dashboard
    const posts = await Blog.findAll({where:{user_id:req.session.user.id}, include:'User'});
    res.render('dashboard', {posts});
});

router.get('/new', (req, res) => {  // Render the new blog post page
    res.render('new-post');
});

router.post('/new', async (req, res) => {   // Process the new blog post form and create a new post
    await Blog.create({title:req.body.title, content:req.body.content, user_id:req.session.user.id});
    res.redirect('/blog/dashboard');
});

router.get('/edit/:id', async (req, res) => {   // Fetch a single blog post and render the edit page
    const post = await Blog.findOne({where:{id:req.params.id}, include:'User'});
    res.render('edit-post', {post});
});

router.post('/edit/:id', async (req, res) => {  // Process the edit blog post form and update the post
    await Blog.update({title:req.body.title, content:req.body.content}, {where:{id:req.params.id}});
    res.redirect('/blog/dashboard');
});

router.post('/delete/:id', async (req, res) => {
    await Blog.destroy({where:{id:req.params.id}});
    res.redirect('/blog/dashboard');
});

router.get('/dashboard', isAuthenticated, async (req, res) => {
    // ...
  });
  
  router.get('/new', isAuthenticated, (req, res) => {
    // ...
  });
  
  router.post('/new', isAuthenticated, async (req, res) => {
    // ...
  });
  
  router.get('/edit/:id', isAuthenticated, async (req, res) => {
    // ...
  });
  
  router.post('/edit/:id', isAuthenticated, async (req, res) => {
    // ...
  });
  
  router.post('/delete/:id', isAuthenticated, async (req, res) => {
    // ...
  });

module.exports = router;