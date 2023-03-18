const router = require('express').Router(); // require express router
const { User, Blog, Comment } = require('../../models'); // require models
const withAuth = require('../../utils/auth'); // require auth middleware

router.get ('/', async (req, res) => { // get all blog posts
    try { // try to get all blog posts
        const blogData = await Blog.findAll({ // find all blog posts
            include: [User],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/blog/:id', async (req, res) => { // get a single blog post
    try { // try to get a single blog post
        const blogData = await Blog.findByPk(req.params.id, { // find a single blog post by its id
            include: [User, Comment],
        }); // find a single blog post by its id
        const blog = blogData.get({ plain: true }); //  get the blog post data
        res.render('blog', { blog, logged_in: req.session.logged_in }); // render the blog post
    }
    catch (err) { // if there is an error, return the error
        res.status(500).json(err);
    }
});

router.get ('/login', (req, res) => { // get login page
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get ('/signup', (req, res) => { // get signup page
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get ('/dashboard', withAuth, async (req, res) => { // get dashboard page
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [User],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('dashboard', { blogs, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/blog/edit/:id', withAuth, async (req, res) => { // get edit blog page
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [User],
        });
        const blog = blogData.get({ plain: true });
        res.render('edit-blog', { blog, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/blog/new', withAuth, (req, res) => { // get new blog page
    res.render('new-blog', { logged_in: req.session.logged_in });
});

module.exports = router;