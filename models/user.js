const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trimmed: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Must be valid email",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// "friendCount" virtual property
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// user model init
const User = model("user", userSchema);

module.exports = User;
