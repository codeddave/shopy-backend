const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProduct);
router.get("/count", productControllers.getProductCount);
router.get("/featured/:limit", productControllers.getFeaturedProducts);

router.post("/", productControllers.createProduct);

router.delete("/:id", productControllers.deleteProduct);
router.put("/:id", productControllers.updateProduct);

module.exports = router;
