const router = require('express').Router();
const { Thought, User } = require('../models'); // Import Thought and User models

//GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
