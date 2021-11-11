var express = require("express");
var router = express.Router();
const {
  createUsers,
  getUserByIdentityNumber,
  getUserByAccountNumber,
} = require("../controllers/apiControllers");
const { checkDuplicateUsers } = require("../middleware/verifyRequest");
const { verifyToken } = require("../middleware/verifyToken");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/users", [verifyToken, checkDuplicateUsers], createUsers);
router.get("/users/:id", [verifyToken], getUserByIdentityNumber);
router.get("/users/:id/account", [verifyToken], getUserByAccountNumber);

module.exports = router;
