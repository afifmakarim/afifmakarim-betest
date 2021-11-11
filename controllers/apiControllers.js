const Users = require("../models/users");

const createUsers = async (req, res) => {
  try {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;

    const newUser = {
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
    };

    const user = await Users.create(newUser);

    res.status(201).json({
      responseCode: "00",
      message: "success create new user",
      data: user,
    });
  } catch (error) {
    res
      .status(404)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

const getUserByIdentityNumber = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ identityNumber: id });

    if (!user) {
      return res.status(404).send({ message: "identityNumber not found" });
    }

    res.status(200).json({
      responseCode: "00",
      message: "Process service request successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(404)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

const getUserByAccountNumber = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ accountNumber: id });

    if (!user) {
      return res.status(404).send({ message: "accountNumber not found" });
    }

    res.status(200).json({
      responseCode: "00",
      message: "Process service request successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(404)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};
module.exports = {
  createUsers,
  getUserByIdentityNumber,
  getUserByAccountNumber,
};
