const { User } = require("../models/index");

const getUserByEmail = async (data) => {
  const response = await User.findOne({
    where: {
      email: data.email,
    },
  });
  return response;
};
module.exports = { getUserByEmail };
