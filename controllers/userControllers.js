const User = require("../models/user");
const HttpError = require("../models/httpError");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return next(new HttpError("user exists!", 401));

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

const signIn = (async = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new HttpError("Please provide email and password"), 400);
  try {
  } catch (error) {}
});

exports.signUp = signUp;
