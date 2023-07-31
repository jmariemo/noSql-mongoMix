const router = require("express").Router();
const {
  usersGet,
  userSingle,
  userCreate,
  userUpdate,
  userDelete,
  friendAdd,
  friendRemove
} = require("../../controllers/userController");

router.route("/").get(usersGet).post(userCreate);

router
  .route("/:userId")
  .get(userSingle)
  .put(userUpdate)
  .delete(userDelete);

router.route("/:userId/friends/:friendId").put(friendAdd);

router.route("/:userId/friends/:friendId").delete(friendRemove);

module.exports = router;