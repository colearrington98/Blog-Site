const router = require('express').Router();
const blogRoutes = require('./blogRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const userRoutes = require('./userRoutes.js');
router.use('/bog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;