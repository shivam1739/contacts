const { User } = require("../models/index");

const getUserByEmail = async (email) => {
  const response = await User.findOne({
    where: {
      email: email,
    },
  });
  return response;
};
module.exports = { getUserByEmail };
