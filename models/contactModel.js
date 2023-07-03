const contacts = require('./contacts.json'); // Load JSON file data

// const contacts = [
//   {
//     contactId: 'abc123',
//     contactName: 'John Smith',
//     contactNumber: '123-456-7890',
//     emailAddress: 'john@example.com'
//   },
//   {
//     contactId: 'xyz789',
//     contactName: 'Jane Doe',
//     contactNumber: '098-765-4321',
//     emailAddress: 'jane@example.com'
//   }
// ];

module.exports = {
  fetchAllContacts: () => contacts.sort((a, b) => a.contactName.localeCompare(b.contactName))
};
