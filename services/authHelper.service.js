const { User } = require("../models/index");

const getUserByEmail = async (body) => {
  const response = await User.findOne({
    where: {
      email: body.email,
    },
  });
  return response;
};
module.exports = { getUserByEmail };
