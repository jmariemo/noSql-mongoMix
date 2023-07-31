const router = require('express').Router();
const {
  thoughtSingle,
  thoughtsGet,
  thoughtCreate,
  thoughtDelete,
  thoughtUpdate,
  reactionAdd,
  reactionRemove
} = require("../../controllers/thoughtController");

router.route("/").get(thoughtsGet).post(thoughtCreate);

router.route("/:thoughtId").get(thoughtSingle);
router.route("/:thoughtId").delete(thoughtDelete);
router.route("/:thoughtId").put(thoughtUpdate);

router.route("/:thoughtId/reactions").post(reactionAdd);

router.route("/:thoughtId/reactions/:reactionId").delete(reactionRemove);

module.exports = router;