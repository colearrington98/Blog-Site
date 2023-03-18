const router = require('express').Router(); // require express router

const apiRoutes = require('./api'); // require api routes
const homeRoutes = require('./homeRoutes'); // require home routes

router.use('/api', apiRoutes); // use api routes
router.use('/', homeRoutes); // use home routes
 
router.use((req, res) => { // if no routes are found, return 404
    res.status(404).end();
});

module.exports = router;