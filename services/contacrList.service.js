const { ContactList } = require("../models/index");
const { sequelize } = require("../models/index");
const addContact = async (data, userId) => {
  const response = await ContactList.create({
    name: data.name,
    contactNo: data.contactNo,
    email: data.email,
    userId: userId,
  });
  return response;
};
const editContact = async (data, { userId, contactId }) => {
  const response = await ContactList.update(
    {
      name: data.name,
      contactNo: data.contactNo,
      email: data.email,
    },
    {
      where: {
        userId: userId,
        id: contactId,
      },
    }
  );
  return response;
};

const findAllContact = async (id) => {
  const response = await ContactList.findAll({
    where: {
      userId: id,
    },
  });
  return response;
};
const findContactByName = async ({ name, userId }) => {
  const response = await ContactList.findAll({
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      ),
      userId: userId,
    },
  });
  return response;
};

const findContactByContactNumber = async ({ userId, number }) => {
  const response = await ContactList.findAll({
    where: {
      userId: userId,
      contactNo: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("contactNo")),
        "LIKE",
        "%" + number + "%"
      ),
    },
  });
  return response;
};
const findContactByEmail = async ({ userId, email }) => {
  const response = await ContactList.findAll({
    where: {
      userId: userId,
      email: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("email")),
        "LIKE",
        "%" + email + "%"
      ),
    },
  });
  return response;
};
const findContactByContactId = async ({ userId, contactId }) => {
  const response = await ContactList.findAll({
    where: {
      userId: userId,
      id: contactId,
    },
  });
  return response;
};
const deleteContact = async ({ userId, contactId }) => {
  console.log(
    "==========================================================",
    userId,
    contactId
  );
  const response = await ContactList.destroy({
    where: {
      userId: userId,
      id: contactId,
    },
  });
  return response;
};
module.exports = {
  addContact,
  findAllContact,
  findContactByContactNumber,
  findContactByEmail,
  findContactByName,
  editContact,
  deleteContact,
  findContactByContactId,
};
