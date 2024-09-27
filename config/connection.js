const mongoose = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia'; // Replace 'socialmedia' with your database name

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose.connection;
