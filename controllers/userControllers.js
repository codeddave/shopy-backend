const User = require("../models/user");
const HttpError = require("../models/httpError");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) return next(new HttpError("user exists!", 401));

    const user = await User.create({
      email,
      password,
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
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

const signIn = (async = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new HttpError("Please provide email and password"), 400);
  try {
    const user = await User.findOne({ email });

    if (!user) return next(new HttpError("User does not exist!", 404));

    const passwordsMatch = user.matchPasswords(password);
    if (!passwordsMatch) return next(new HttpError("Invalid credentials", 404));

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "1hr" }
    );
    res.status(200).json(token);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
});

exports.signUp = signUp;
exports.signIn = signIn;
