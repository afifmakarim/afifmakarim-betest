const Admin = require("../models/admin");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newAdmin = {
      username,
      password,
    };

    const admin = await Admin.create(newAdmin);

    res.status(201).json({
      responseCode: "00",
      message: "success create new admin",
      data: admin,
    });
  } catch (error) {
    res
      .status(404)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  } catch (error) {
    res
      .status(404)
      .json({ responseCode: "99", message: "General Error", data: error });
    console.log(error);
  }
};

module.exports = { signIn, signUp };
