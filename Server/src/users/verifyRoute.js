const { Router } = require("express");
const controller = require("./controller");
const authorisation = require("../../middleware/authorisation");

const router = Router();

// Verify
router.get("/is-verify", authorisation, controller.verifyUser);


module.exports = router;
