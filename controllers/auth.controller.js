const authHelperService = require("../services/authHelper.service");
const authServices = require("../services/auth.service");

const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    return res.json({
      message: "please provide sufficent data",
      status: 400,
      success: true,
    });
  }
  try {
    const response = await authServices.signUp(req.body);
    // console.log(response);
    return res.json({
      message: "succsessfully signup",
      status: 200,
      success: true,
      data: response,
    });
  } catch (response) {
    console.log(response);
    return res.json({
      message: response,
      status: 400,
      success: true,
      data: response,
    });
  }
};
const signIn = async (req, res) => {
  const userData = await authHelperService.getUserByEmail(req.body);
  if (!userData) {
    return res.json({
      message: "email is invalid",
      status: 401,
      success: true,
      data: {},
    });
  }
  const verifyPassword = authServices.verifyPassword(
    req.body.password,
    userData.password
  );
  if (!verifyPassword) {
    res.json({
      message: "invalid email id and password",
      status: 401,
      success: true,
      data: {},
    });
  }
  // console.log(process.env.JWT_SECRET_KEY);
  var token = jwt.sign(
    {
      email: userData.email,
      password: userData.password,
      username: userData.firstName,
    },
    process.env.JWT_SECRET_KEY
  );

  return res.json({
    message: "successfully login",
    status: 200,
    success: true,
    data: {
      email: userData.email,
      userId: userData.id,
      name: userData.firstName + " " + userData.lastName,
    },
    token: token,
  });
};
module.exports = {
  signUp,
  signIn,
};
