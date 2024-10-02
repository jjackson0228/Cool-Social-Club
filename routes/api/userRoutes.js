const router = require('express').Router();
const { User } = require('../../models/user');

//GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET single user by _id (populated with thoughts and friends)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'thoughts friends'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//creates new user
router.post('/', (req, res) => {
  const { username, email } = req.body;

  // Validate required fields
  if (!username || !email) {
    return res
      .status(400)
      .json({ message: 'Username and email are required.' });
  }

  User.create({ username, email })
    .then((user) => {
      res.status(201).json(user); //send back created user
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err); // Handle errors
    });
});
module.exports = router;
