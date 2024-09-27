const { Schema, model } = require('mongoose');

//define the User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'], //might need to look up matching validation
    },
    friends: [
      {
        type: Schema.Types.ObjectId, //Array of ObjectIds
        ref: 'User', // Reference to the User model (self-reference)
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId, //Array of ObjectIds
        ref: 'Thought', // Reference to the Thoughts model
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

//Create the User model
const User = model('User', userSchema);

module.exports = User;
