const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
const { fetchAllContacts } = require('../models/contactModel');

// const user = require('../models/userModel');

exports.getDashboard = (req, res) => {
  const contacts = fetchAllContacts();
  if (req.session.isLoggedIn) {
    res.render('pages/dashboard', { contacts, title: 'Dashboard' });
    // res.send('Welcome, you are logged in');
  }
  else {
    res.redirect('/login');
  }
};
exports.getInsertContact = (req, res) => {
  const contacts = fetchAllContacts();
  res.render('pages/insert-contact', { contacts, title: 'Insert New Contact' });
};

exports.insertContact = (req, res) => {
  const contacts = fetchAllContacts();
  let newContact = req.body;

  // Validate the inputs
  if (!newContact.contactName || !newContact.contactNumber || !newContact.emailAddress) {
    res.status(400).send('Please fill all fields');
    return;
  }

  // Generate new contactId
  let contactId = nanoid(6);

  // Check if contactId is unique
  let isUnique = contacts.every((contact) => contact.contactId !== contactId);
  while (!isUnique) {
    contactId = nanoid(6);
    // eslint-disable-next-line no-loop-func
    isUnique = contacts.every((contact) => contact.contactId !== contactId);
  }

  newContact = { ...newContact, contactId };

  contacts.push(newContact);
  fs.writeFileSync(path.join(__dirname, '../models/contacts.json'), JSON.stringify(contacts, null, 2));
  res.redirect('/dashboard');
};

exports.deleteContact = (req, res) => {
  const contacts = fetchAllContacts();
  const { contactId } = req.params;
  const index = contacts.findIndex((contact) => contact.contactId === contactId);

  if (index !== -1) {
    contacts.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, '../models/contacts.json'), JSON.stringify(contacts, null, 2));
  }

  res.redirect('/dashboard');
};

exports.getUpdateContact = (req, res) => {
  // app.get('/update/:contactId',
  const { contactId } = req.params;
  const contacts = fetchAllContacts();

  const contact = contacts.find((item) => item.contactId === contactId);
  res.render('pages/update-contact', { contact, title: `Update ${contactId}` });
};

exports.updateContact = (req, res) => {
  const contacts = fetchAllContacts();
  const { contactId } = req.params;
  const index = contacts.findIndex((contact) => contact.contactId === contactId);

  if (index !== -1) {
    const updatedContact = req.body;

    // Validate the inputs
    // eslint-disable-next-line max-len
    if (!updatedContact.contactName || !updatedContact.contactNumber || !updatedContact.emailAddress) {
      res.status(400).send('Please fill all fields');
      return;
    }

    updatedContact.contactId = contactId; // Keep the contactId same
    contacts[index] = updatedContact;
    fs.writeFileSync(path.join(__dirname, '../models/contacts.json'), JSON.stringify(contacts, null, 2));
  }
  else {
    res.status(404).send('Contact not found');
    return;
  }

  res.redirect('/dashboard');
};
