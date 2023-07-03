const user = require('../models/userModel');

exports.getLogin = (req, res) => {
  res.render('pages/login', { title: 'Login', message: '' });
};

exports.postLogin = (req, res) => {
  const foundUser = user.findByUsername(req.body.username);

  if (foundUser && foundUser.password === req.body.password) {
    req.session.isLoggedIn = true;
    req.session.user = req.body.username;
    res.redirect('/dashboard');
  }
  else {
    res.render('pages/login', { title: 'Login', message: 'Invalid username or password' });
  }
};
