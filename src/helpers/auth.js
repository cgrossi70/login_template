const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next()
  else {
    req.flash('error_msg',[{error: 'Not authorized'}])
    res.redirect('/users/signin')
  }
}
module.exports = helpers