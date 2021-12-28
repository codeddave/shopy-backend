const HttpError = require("../models/httpError");
const Category = require("../models/category");

const createCategory = (req, res, next) => {};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    return next(
      new HttpError("Could not get categories, try again later", 404)
    );
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
