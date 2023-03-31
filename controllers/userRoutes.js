const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/signup', (req, res) => {   // Render the signup page
    res.render('signup');
});

router.post('/signup', async (req, res) => {    // Process the signup form and create a new user
    const hashedPassword = await bycrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hashedPassword });
    res.redirect('/user/login');
});

router.get('/login', (req, res) => {    // Render the login page
    res.render('login');
});

router.post('/login', async (req, res) => { // Process the login form and authenticate the user
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {user && await User.findOne({ where: { username: req.body.username } });
        req.session.user = user;
        res.redirect('/blog/dashboard');
    } else {
        res.redirect('/user/login', {error: 'Invalid username or password'});
    }
});

router.get('/logout', (req, res) => {   // Log the user out and redirect to the homepage
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
