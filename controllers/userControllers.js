const User = require("../models/user");
const HttpError = require("../models/httpError");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const {
    email,
    password,
    phone,
    isAdmin,
    street,
    city,
    apartment,
    zip,
    country,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return next(new HttpError("user exists!", 401));

    const user = await User.create({
      email,
      password,
      phone,
      isAdmin,
      street,
      city,
      apartment,
      zip,
      country,
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        isAdim: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(201).json(token);
  } catch (error) {
    return next(
      new HttpError("Account could not be created at this time", 409)
    );
  }
};

const login = (async = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new HttpError("Please provide email and password"), 400);
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new HttpError("User does not exist!", 404));

    const passwordsMatch = user.matchPasswords(password);
    if (!passwordsMatch) return next(new HttpError("Invalid credentials", 404));

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        isAdim: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "1hr" }
    );
    res.status(200).json(token);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
});

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return next(new HttpError("User does not exist", 404));

    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const getUserCount = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments((count) => count);
    if (!userCount)
      return next(new HttpError("Could not retrieve user count", 404));

    res.status(200).json(userCount);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    if (user) {
      return res.status(200).json({ message: "user deleted successfully" });
    } else {
      return next(new HttpError("user not found", 404));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.getUserCount = getUserCount;
exports.deleteUser = deleteUser;
