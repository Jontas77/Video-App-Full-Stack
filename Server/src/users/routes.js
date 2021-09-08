const { Router } = require("express");
const controller = require("../users/controller");

const router = Router();

// Registering
router.post("/", controller.createNewUser);


module.exports = router;
