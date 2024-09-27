const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Automatically generate a unique ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), //this getter should return a value from something like this ("createdAt": 1633024800000)
      //into this format ("createdAt": "10/1/2021, 12:00:00 AM")
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createAt: {
      type: Date,
      default: Date.now, // Default value set to the current timestamp
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Getter to format the date
    },
    username: {
      type: String, //The field is of type String
      required: true, // This field must be provided (the user who created the thought)
    },
    reactions: [reactionSchema], // Array of nested reaction documents
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
