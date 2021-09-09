const { Router } = require("express");
const controller = require("./controller");
const validation = require("../../middleware/validation");

const router = Router();

// Registering
router.post("/register", validation, controller.registerNewUser);


module.exports = router;
