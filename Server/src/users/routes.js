const { Router } = require("express");
const controller = require("./controller");
const validation = require("../../middleware/validation");
const authorisation = require("../../middleware/authorisation");

const router = Router();

// Register, Login, verify and dashboard routes
router.post("/register", validation, controller.registerNewUser);
router.post("/login", validation, controller.loginUser);
router.get("/is-verify", authorisation, controller.verifyUser);
router.get("/dashboard", authorisation, controller.getDashboard);

module.exports = router;
