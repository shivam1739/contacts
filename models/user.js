"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ContactList, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          /* validations are being validated at sequelize level in the project */
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,

        validate: {
          len: [5, 20],
          isAlphanumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword; //this line will replace user's actual password with hashed password
  });
  return User;
};
