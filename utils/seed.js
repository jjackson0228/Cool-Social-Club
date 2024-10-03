const connection = require('../config/connection'); // Connect to MongoDB
const { User, Thought } = require('../models'); // Import your models

// Example data for users
const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
  },
  {
    username: 'johnDoe',
    email: 'johndoe@example.com',
  },
  {
    username: 'longlegs',
    email: 'longlegs@example.com',
  },
  {
    username: 'dawgsfan',
    email: 'ugafan@example.com',
  },
];

// Example data for thoughts
const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: 'lernantino',
  },
  {
    thoughtText: 'Learning MongoDB is fun!',
    username: 'johnDoe',
  },
  {
    thoughtText: 'Its the birthday girl!',
    username: 'longlegs',
  },
  {
    thoughtText: 'GO DAWGS!',
    username: 'dawgsfan',
  },
];

// Seed function
connection.once('open', async () => {
  try {
    // Clear out existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Create thoughts and associate with users
    for (const thought of thoughts) {
      const user = createdUsers.find((u) => u.username === thought.username);
      const newThought = await Thought.create({ ...thought });

      // Push the thought's ObjectId to the associated user's thoughts array
      user.thoughts.push(newThought._id);
      await user.save();
    }

    console.log('Database seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0); // Exit the process when done
  }
});
