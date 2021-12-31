const express = require("express");
const router = express.Router();

const categoryControllers = require("../controllers/categoryControllers");

router.get("/", categoryControllers.getCategories);
router.get("/:id", categoryControllers.getCategory);

router.post("/", categoryControllers.createCategory);
router.delete("/:id", categoryControllers.deleteCategory);
router.put("/:id", categoryControllers.updateCategory);

module.exports = router;
