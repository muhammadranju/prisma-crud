const router = require("express").Router();
const {
  userController,
  getUserController,
  getUserByIdController,
} = require("../controller/user.controllers");

router.post("/", userController);
router.get("/", getUserController);
router.get("/:id", getUserByIdController);
router.put("/", userController);
router.delete("/", userController);

module.exports = router;
