const authController = require("../controllers/auth.controller");
// const authMiddelWare = require("../middelWare/authenctication.validators");
const routes = (app) => {
  app.post("/contactlist/api/v1/signup", authController.signUp);

  app.post("/contactlist/api/v1/signin", authController.signIn);
};

module.exports = routes;
