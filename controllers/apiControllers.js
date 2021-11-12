const Users = require("../models/users");
const { produceEachCreateUsers } = require("../services/kafka");

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

    produceEachCreateUsers(user).catch((err) => {
      console.error("error in producer: ", err);
    });

    res.status(201).json({
      responseCode: "00",
      message: "success create new user",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
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
      .status(500)
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
      .status(500)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    const updatedUser = {
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
    };
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const user = await Users.findByIdAndUpdate(id, updatedUser, {
      useFindAndModify: false,
    });
    if (!user) {
      res.status(404).send({
        message: `Cannot update user with id=${id}. user not found!`,
      });
    }
    res.status(200).json({
      responseCode: "00",
      message: "Process service request successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. user not found!`,
      });
    }

    res.status(200).json({
      responseCode: "00",
      message: "Process service request successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

module.exports = {
  createUsers,
  getUserByIdentityNumber,
  getUserByAccountNumber,
  updateUsers,
  deleteUserById,
};
