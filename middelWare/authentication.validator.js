const authHelperService = require("../services/authHelper.service");
const authServices = require("../services/auth.service");
const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.json({
      status: 401,
      message: "JWT token is missing",
      data: {},
      err: "Invalid or missing argument in request header",
    });
  }
  const response = authServices.verifyToken(token);
  if (!response) {
    return res.json({
      status: 401,
      message: "JWT token is invelid",
      data: {},
      err: "Invalid or missing argument in request header",
    });
  }

  const user = await authHelperService.getUserByEmail(response.email);
  if (!user) {
    return res.json({
      status: 401,
      message: "JWT token send for an invalid user",
      data: {},
      err: "Invalid credentials  ",
    });
  }
  req.user = user;
  next();
};

module.exports = {
  isAuthenticated,
};
