const express = require("express");
const productControllers = require("../controllers/productControllers");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    cb(null, fileName + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProduct);
router.get("/count", productControllers.getProductCount);
router.get("/featured/:limit", productControllers.getFeaturedProducts);

router.post("/", productControllers.createProduct);

router.delete("/:id", productControllers.deleteProduct);
router.put("/:id", productControllers.updateProduct);

module.exports = router;
