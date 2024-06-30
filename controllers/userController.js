const { Thought, User } = require('../models')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts', 'users');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
}