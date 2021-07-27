const express = require("express");
const {
    login,
    register,
    logout,
    check_not_auth,
    check_auth,
    getUser,
} = require("../controller/auth");
const router = express.Router();

//req parameters: username | password
router.post("/login", check_not_auth, login);

//req parameters: username | firstName | lastName | password
router.post("/register", check_not_auth, register);

router.get("/logout", check_auth, logout);
router.get("/getuser", check_auth, getUser);

module.exports = router;
