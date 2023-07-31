const { Thought, User } = require("../models");

// get all users
function usersGet(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
};
  
// Get a single user
function userSingle(req, res) {
        User.findOne({ _id: req.params.userId })
          .select("-__v")
          .populate("thoughts")
          .populate("friends")
          .then((user) =>
            !user
              ? res.status(404).json({ message: "Sorry, user not found" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
};
  
      // Create a user
      async function userCreate(req, res) {
        try {
          console.log(req.body)
          const userData = await User.create(req.body);
          console.log(userData)
          res.json(userData)
        } catch (err) {
          console.log(err)
        }
      };
  
//update user
function userUpdate(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "Sorry, user not found" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
        }; 

// delete user
function userDelete(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "Sorry, user not found" })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User profile deleted!' }))
          .catch((err) => res.status(500).json(err));
      };
  
// add friend
function friendAdd(req, res) {
        console.log(("Add a friend!"));
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: "Sorry, user not found" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
};
  
// remove friend
function friendRemove(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: "Sorry, user not found" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
};

module.exports = {
  usersGet,
  userSingle,
  userCreate,
  userUpdate,
  userDelete,
  friendAdd,
  friendRemove,
};
  