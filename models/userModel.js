//   Filename: login.ejs
//   Student's Name: Justin Amaral
//   StudentID: 301230988
//   Date: 22-06-2023
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];

module.exports = {
  findByUsername: (username) => users.find((user) => user.username === username)
};
