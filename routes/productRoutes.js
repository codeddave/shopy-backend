const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productControllers.getProducts);
router.post("/", productControllers.createProduct);

router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
