const contactlistController = require("../controllers/contactList.controller");
const authenticated = require("../middelWare/authentication.validator");
const routes = (app) => {
  // api for new contact
  app.post(
    "/contactlist/api/v1/add/:userId",
    authenticated.isAuthenticated,
    contactlistController.addContact
  );
  //api for update contact
  app.patch(
    "/contactlist/api/v1/edit",
    authenticated.isAuthenticated,
    contactlistController.editContact
  );
  // api for find all product
  app.get(
    "/contactlist/api/v1/find/:userId",
    authenticated.isAuthenticated,
    contactlistController.findAllContact
  );
  //api for find contact by number
  app.get(
    "/contactlist/api/v1/find",
    authenticated.isAuthenticated,
    contactlistController.findContacts
  );
  app.delete(
    "/contactlist/api/v1/delete",
    authenticated.isAuthenticated,
    contactlistController.deleteContact
  );
};
module.exports = routes;
