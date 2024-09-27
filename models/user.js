const { Schema, model } = require('mongoose');

//define the User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

//Create the User model
const User = model('User', userSchema);

module.exports = User;
