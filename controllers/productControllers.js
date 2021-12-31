const Product = require("../models/product");
const HttpError = require("../models/httpError");

const getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
};

const createProduct = async (req, res, next) => {
  const {} = req.body;
  try {
  } catch (error) {}
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
