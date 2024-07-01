const { Thought, User } = require('../models')

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const createThought = await Thought.create(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: createThought._id} },
        { new: true }
      );
      console.log(updatedUser)
      res.json(createThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateThought) {
        res.status(404).json({ message: 'No thought with this id' });
      }

      res.json(updateThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deleteThought) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'Thought deleted successfully', user: deleteThought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}