const router = require('express').Router();
const userRoutes = require('./api/userRoutes'); //added userRoutes and defined it to use ('api/userRoutes') so I can use them in the router
const thoughtRoutes = require('./api/thoughtRoutes'); //added thoughtRoutes and defined it to use ('api/thoughtRoutes')so I can use them in the router
//use userRoutes and thoughtRoutes
router.use('/api/users', userRoutes); //router will use the api routes for users in a variable called userRoutes
router.use('/api/thoughts', thoughtRoutes); //router will use the api routes for users in a variable called thoughtRoutes

module.exports = router;
