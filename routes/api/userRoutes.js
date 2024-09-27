const router = require('express').Router();
const User = require('../../models/user');

//create a new user
router.post('/', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user); //send back created user
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err); // Handle errors
    });
});

module.exports = router;
