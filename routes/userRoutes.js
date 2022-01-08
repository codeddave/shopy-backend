const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUser);

router.get("/count", userControllers.getUserCount);

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
