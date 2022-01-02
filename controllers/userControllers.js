const User = require("../models/user");
const HttpError = require("../models/httpError");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await User.create({
      email,
      password,
    });

    res.status(201).json();
  } catch (error) {
    return next(
      new HttpError("Account could not be created at this time", 409)
    );
  }
};

exports.signUp = signUp;
