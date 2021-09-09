const { Router } = require("express");
const controller = require("./controller");
const authorisation = require("../../middleware/authorisation");

const router = Router();

router.get("/dashboard", authorisation, controller.getDashboard);


module.exports = router;
