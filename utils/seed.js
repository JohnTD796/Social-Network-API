const connection = require('../config/connection')
const { User, Thought } = require('../models');
const { userData, thoughtData, reactionData } = require('./data')

connection.dropCollection('users');
connection.dropCollection('thoughts');

User
  .create(userData)
  .then(data => console.log(data))
  .catch(err => console.log(err));

Thought
  .create(thoughtData)
  .then(data => console.log(data))
  .catch(err => console.log(err));

// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   let userCheck = await connection.db.listCollections({ name: 'users'}).toArray();
//   if (userCheck.length) {
//     await connection.dropCollection('users');
//   }

//   let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
//   if (thoughtCheck.length) {
//     await connection.dropCollection('users');
//   }

//   await User.insertMany(userData)
// });

// await User.create(userData);