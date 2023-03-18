const router = require('express').Router(); // require express router
const { Blog, User, Comment } = require('../../models'); // require models

router.post ('/', async (req, res) => { // create a new blog post
    try { 
        const blogData = await Blog.create(req.body);
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete ('/:id', async (req, res) => { // delete a blog post
    try { 
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' }); // if no blog post found with this id
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;