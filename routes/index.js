const router = require('express').Router();
const userRoutes = require('./api/userRoutes');

//use user routes
router.use('/api/users', userRoutes);

module.exports = router;
