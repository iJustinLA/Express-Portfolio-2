/*
  Filename: users.js
  Student's Name: Justin Amaral
  StudentID: 301230988
  Date: 28-05-2023
*/
const express = require('express');
const {
  getDashboard, deleteContact, getUpdateContact, updateContact, insertContact, getInsertContact
} = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', getDashboard);

router.get('/contacts/:contactId/delete', deleteContact);
// router.get('/contacts/:contactId', getUpdateContact);
router.get('/contacts/:contactId/update', getUpdateContact);
router.post('/contacts/:contactId/update', updateContact);
router.post('/contacts/insert', insertContact);
router.get('/contacts/insert', getInsertContact);

module.exports = router;
