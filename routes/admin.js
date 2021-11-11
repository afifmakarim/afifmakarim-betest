var express = require("express");
var router = express.Router();
const { signIn, signUp } = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
