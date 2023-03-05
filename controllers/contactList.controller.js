const contactsServices = require("../services/contacrList.service");
const addContact = async (req, res) => {
  try {
    const response = await contactsServices.addContact(
      req.body,
      req.params.userId
    );
    return res.json({
      message: "successfully add contact",
      status: 200,
      success: true,
      data: response,
    });
  } catch (err) {
    return console.log(err);
  }
};

const editContact = async (req, res) => {
  try {
    const response = await contactsServices.editContact(req.body, req.query);
    return res.json({
      message: "successfully edit contact",
      status: 200,
      success: true,
      data: response,
    });
  } catch (err) {
    return console.log(err);
  }
};
const findContacts = async (req, res) => {
  let response = "";
  if (req.query.name) {
    response = await findContactByName(req, res);
  } else if (req.query.email) {
    response = await findContactByEmail(req, res);
  } else if (req.query.number) {
    response = await findContactByContactNumber(req, res);
  } else if (req.query.contactId) {
    response = await findContactByContactId(req, res);
  }
  console.log("", response);
  if (response.length == 0) {
    return res.json({
      message: "contact not found",
      status: 200,
      success: true,
      data: response,
    });
  }
  return res.json({
    message: "successfully find contact",
    status: 200,
    success: true,
    data: response,
  });
};

const findAllContact = async (req, res) => {
  try {
    const response = await contactsServices.findAllContact(req.params.userId);
    return res.json({
      message: "successfully find contact",
      status: 200,
      success: true,
      data: response,
    });
  } catch (err) {
    return console.log(err);
  }
};

const findContactByName = async (req, res) => {
  try {
    const response = await contactsServices.findContactByName(req.query);
    return response;
  } catch (err) {
    return err;
  }
};
const findContactByContactId = async (req, res) => {
  try {
    const response = await contactsServices.findContactByContactId(req.query);
    return response;
  } catch (err) {
    return err;
  }
};
const findContactByContactNumber = async (req, res) => {
  try {
    const response = await contactsServices.findContactByContactNumber(
      req.query
    );
    return response;
  } catch (err) {
    return err;
  }
};
const findContactByEmail = async (req, res) => {
  try {
    const response = await contactsServices.findContactByEmail(req.query);
    return response;
  } catch (err) {
    return err;
  }
};

const deleteContact = async (req, res) => {
  try {
    const response = await contactsServices.deleteContact(req.query);
    console.log(req.query);
    return res.json({
      message: "successfully delete contact",
      status: 200,
      success: true,
      data: response,
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  addContact,
  findAllContact,
  findContactByContactNumber,
  findContactByEmail,
  findContactByName,
  editContact,
  deleteContact,
  findContacts,
  findContactByContactId,
};
