// seed.js
const connection = require('../config/connection'); // Connect to MongoDB
const { User, Thought } = require('../models'); // Import your models
const {
  generateRandomUser,
  generateRandomEmail,
  generateRandomThought,
  generateRandomReactions,
} = require('./data'); // Import functions from data.js

// Seed function
connection.once('open', async () => {
  try {
    // Clear out existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Generate users dynamically
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: generateRandomUser(),
        email: generateRandomEmail(),
      });
    }

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Generate and create thoughts, associating them with users
    for (const user of createdUsers) {
      const newThought = await Thought.create({
        thoughtText: generateRandomThought(),
        username: user.username,
        reactions: generateRandomReactions(3), // Add random reactions
      });

      // Push the thought's ObjectId to the associated user's thoughts array
      user.thoughts.push(newThought._id);
      await user.save();
    }

    console.log('Database seeded with random users and thoughts!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0); // Exit the process when done
  }
});
