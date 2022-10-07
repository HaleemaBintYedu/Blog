const User = require("./user.model");
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      next(createHttpError(409, "Email already in use."));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "Invalid credentials"));
    }

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Invalid credentials"));
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
