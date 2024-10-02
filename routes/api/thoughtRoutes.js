const router = require('express').Router();
const { Thought, User } = require('../models'); // Import Thought and User models

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    // Find all thoughts and populate associated reactions
    const thoughts = await Thought.find().populate('reactions');

    // Send the retrieved thoughts in the response
    res.status(200).json(thoughts);
  } catch (err) {
    // Log the error for debugging
    console.error('Error retrieving thoughts:', err);
    res.status(500).json(err); // Send a 500 status for server errors
  }
});

module.exports = router;
