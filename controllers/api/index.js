const require = require('express').Router(); 
const { User, Blog, Comment } = require('../../models'); //

router.use ('/blog', require('./blogRoutes')); 
router.use ('/user', require('./userRoutes'));

module.exports = router;