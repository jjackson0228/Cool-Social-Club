const { Schema, model } = require('mongoose');

//define the User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Must match an email address!',
      ], //might need to look up matching validation
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

//Virtual property for friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; //Returns the length of the friends array
});

userSchema.pre('findOneAndDelete', async function (next) {
  const doc = await User.findOne(this.getQuery());
  console.log(doc);
  console.log(`Deleting thoughts by ${doc.username}`);
  await Thought.deleteMany({ username: doc.username });
  next();
});
//Create the User model
const User = model('User', userSchema);

module.exports = User;
