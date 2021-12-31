const Product = require("../models/product");
const Category = require("../models/category");
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
  const {
    name,
    price,
    image,
    images,
    description,
    richDescription,
    categoryId,
    brand,
    numberInStock,
    rating,
    reviewsNumber,
    isFeatured,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(new HttpError("No category with that Id", 404));
    await Product.create({
      name,
      price,
      image,
      images,
      description,
      richDescription,
      category: categoryId,
      brand,
      numberInStock,
      rating,
      reviewsNumber,
      isFeatured,
    });
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
