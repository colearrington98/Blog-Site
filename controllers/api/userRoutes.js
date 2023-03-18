const router = require('express').Router(); // require express router
const { User, Blog, Comment } = require('../../models'); // require models

router.post('/', async (req, res) => { // create a new user
    try { // try to create a new user
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        }); // save the user's session
    } catch (err) { // if there is an error, return the error
        res.status(400).json(err);
    } // end try/catch
});
