const Category = require("../models/category");

const createCategory = (req, res, next) => {};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {}
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
