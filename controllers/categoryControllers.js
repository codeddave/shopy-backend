const HttpError = require("../models/httpError");
const Category = require("../models/category");

const createCategory = async (req, res, next) => {
  const { name, color, image } = req.body;
  try {
    const category = await Category.create({
      name,
      color,
      image,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    return next(
      new HttpError(error.message, 404)
      // new HttpError("Could not get categories, try again later", 404)
    );
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
