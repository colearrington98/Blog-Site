const withAuth = (req, res, next) => { // if user is not logged in, redirect to login page
    if (!req.session.logged_in) { // if user is not logged in
        res.redirect('/login'); // redirect to login page
    } else { // if user is logged in
        next(); // continue to the next middleware
    } // end if/else
} // end withAuth\

module.exports = withAuth;