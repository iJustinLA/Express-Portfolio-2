/*
  Filename: users.js
  Student's Name: Justin Amaral
  StudentID: 301230988
  Date: 28-05-2023
*/
const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
