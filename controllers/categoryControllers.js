const HttpError = require("../models/httpError");
const Category = require("../models/category");
const mongoose = require("mongoose");

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
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new HttpError("Category not found", 404));

    res.status(200).json(category);
  } catch (error) {
    return next(
      new HttpError(error.message, 500)
      // new HttpError("Could not get categories, try again later", 404)
    );
  }
};

const deleteCategory = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const category = await Category.findByIdAndRemove(_id);
    if (category) {
      req.status(200).json({ message: "Category deleted successfully" });
    } else {
      req.status(404).json({ message: " category not found" });
    }
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};
const updateCategory = async (req, res, next) => {
  const { id: _id } = req.params;
  const { name, icon, color } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No category with that id");
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    );

    res.status(201).json(updatedCategory);
  } catch (error) {
    return next(new HttpError(error.message, 409));
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
