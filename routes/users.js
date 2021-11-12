var express = require("express");
var router = express.Router();
const {
  createUsers,
  getUserByIdentityNumber,
  getUserByAccountNumber,
  updateUsers,
  deleteUserById,
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
router.put("/users/:id", [verifyToken, checkDuplicateUsers], updateUsers);
router.delete("/users/:id", [verifyToken, checkDuplicateUsers], deleteUserById);

module.exports = router;
