const router = require("express").Router();
const { userController } = require("../controller/user.controllers");

router.post("/", userController);
router.get("/", userController);
router.get("/:id", userController);
router.put("/", userController);
router.delete("/", userController);

module.exports = router;
