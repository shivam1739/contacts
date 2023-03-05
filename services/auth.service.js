const jwt = require("jsonwebtoken");

const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

const signUp = async (body) => {
  const response = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });
  return response;
};

const verifyPassword = (password, hashedPassword) => {
  const response = bcrypt.compareSync(password, hashedPassword);
  return response;
};
const verifyToken = (token) => {
  try {
    const response = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return response;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { signUp, verifyToken, verifyPassword };
