const express = require("express");
const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");

router.get("/", categoryControllers.getCategories);
router.post("/", categoryControllers.createCategory);

module.exports = router;
