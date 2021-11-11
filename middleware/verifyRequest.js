const Users = require("../models/users");

const checkDuplicateUsers = async (req, res, next) => {
  try {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;

    const checkEmail = await Users.findOne({ emailAddress: emailAddress });
    const checkIdentityNumber = await Users.findOne({
      identityNumber: identityNumber,
    });
    const checkUserName = await Users.findOne({
      userName: userName,
    });
    const checkAccountNumber = await Users.findOne({
      accountNumber: accountNumber,
    });

    if (checkEmail) {
      return res.status(400).send({ message: "emailAddress already exist" });
    }

    if (checkIdentityNumber) {
      return res.status(400).send({ message: "identityNumber already exist" });
    }

    if (checkUserName) {
      return res.status(400).send({ message: "userName already exist" });
    }

    if (checkAccountNumber) {
      return res.status(400).send({ message: "accountNumber already exist" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

module.exports = { checkDuplicateUsers };
