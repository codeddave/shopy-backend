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

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    if (!product) return next(new HttpError("Product  does not exist", 404));
    res.status(200).json(product);
  } catch (error) {
    return next(new HttpError(error.message, 500));
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

const deleteProduct = async (req, res, next) => {
  const { id: _id } = req.params;

  try {
    const product = await Product.findByIdAndRemove(_id);
    if (product) {
      return res.status(200).json({ message: "product deleted successfully" });
    } else {
      return next(new HttpError("product not found", 404));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const updateProduct = async (req, res, next) => {
  const { id: _id } = req.params;
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
    const product = await Product.findById(_id);
    if (!product) {
      return next(new HttpError("product not found", 404));
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new HttpError("category not found", 404));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
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
      },
      { new: true }
    );

    res.status(201).json(updatedProduct);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.getProduct = getProduct;
