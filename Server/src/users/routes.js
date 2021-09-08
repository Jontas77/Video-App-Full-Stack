const { Router } = require("express");
const controller = require("../users/controller");

const router = Router();

router.get("/", (req, res) => res.json({ msg: "Hi from users route" }));


module.exports = router;
