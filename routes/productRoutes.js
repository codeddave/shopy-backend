const express = require("express");
const productControllers = require("../controllers/productControllers");
const router = express.Router();
const multer = require("multer");
const HttpError = require("../models/httpError");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];

    let uploadError = new HttpError("file format not supported");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProduct);
router.get("/count", productControllers.getProductCount);
router.get("/featured/:limit", productControllers.getFeaturedProducts);

router.post(
  "/",
  uploadOptions.single("image"),
  productControllers.createProduct
);

router.delete("/:id", productControllers.deleteProduct);
router.put(
  "/:id",
  uploadOptions.single("image"),
  productControllers.updateProduct
);
router.put(
  "/gallery-images/:id",
  uploadOptions.array("images, 10"),
  productControllers.updateProductImageGallery
);
module.exports = router;
