const router = require("express").Router();
const {
  userController,
  getUserController,
  getUserByIdController,
  deleteUserController,
  updateUserController,
  //
} = require("../controller/user.controllers");

router.post("/", userController);
router.get("/", getUserController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

module.exports = router;
