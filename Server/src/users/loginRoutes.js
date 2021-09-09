const { Router } = require("express");
const controller = require("./controller");
const validation = require("../../middleware/validation");

const router = Router();

// Log in
router.post("/login", validation, controller.loginUser);


module.exports = router;
