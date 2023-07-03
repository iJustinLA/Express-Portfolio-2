/*
  Filename: index.js
  Student's Name: Justin Amaral
  StudentID: 301230988
  Date: 28-05-2023
*/

const express = require('express');
const { getLogin, postLogin } = require('../controllers/loginController');

const router = express.Router();

// eslint-disable-next-line consistent-return
function isUnAuthenticated(req, res, next) {
  if (!req.session.isLoggedIn) {
    req.isLoggedIn = true;
    return next();
  }
  res.redirect('/dashboard');
}
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Home' });
});

router.get('/about', (req, res, next) => {
  res.render('pages/about', { title: 'About Me' });
});

router.get('/services', (req, res, next) => {
  res.render('pages/services', { title: 'My Services' });
});

router.get('/projects', (req, res, next) => {
  res.render('pages/projects', { title: 'My Projects' });
});

router.get('/contact', (req, res, next) => {
  res.render('pages/contact', { title: 'Contact Me' });
});

router.post('/contact', (req, res, next) => {
  res.redirect('/');
});

router.get('/login', isUnAuthenticated, getLogin);

router.post('/login', isUnAuthenticated, postLogin);

module.exports = router;
