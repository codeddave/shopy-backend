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
    return next(1
      new HttpError(error.message, 404)
      // new HttpError("Could not get categories, try again later", 404)
    );
  }
};

const deleteCategory = async(req, res, next)=> {

    const {id:_id} = req.params
        try {
            const category  =  await Category.findByIdAndRemove(_id)
            if(category) {
                req.status(200).json({message:"Category deleted successfully" })
            } else {
                req.status(404).json({message:" category not found" })
            }
        } catch (error) {
            return next(new HttpError(error.message, 400))
        }
}

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.deleteCategory = deleteCategory