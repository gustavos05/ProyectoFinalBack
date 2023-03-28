const Users = require("../models/Users");
const sequelize = require("../utils/connection");
require("../models/Users");
require("../models/Category");

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    await Users.create({
      firstName: "Test",
      lastName: "User",
      email: "test@gmail.com",
      password: "test1234",
      phone: "1234567890",
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
