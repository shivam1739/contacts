const express = require("express");

const { sequelize } = require("./models/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Port = process.env.PORT || 3000;
const authRoute = require("./routes/auth.route");
const contactRoute = require("./routes/contactList.route");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
authRoute(app);
contactRoute(app);

app.listen(Port, async () => {
  await sequelize.sync();
  console.log(`app listning to port ${Port}`);
});
