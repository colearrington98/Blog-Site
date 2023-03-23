function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
    } else {
        res.redirect('/user/login');
  }
}

module.exports = isAuthenticated; // Export the isAuthenticated function