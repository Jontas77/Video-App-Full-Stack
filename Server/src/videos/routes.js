const { Router } = require("express");
const controller =require("./controller");

const router = Router();

router.get("/", controller.getVideos);
router.get("/:id", controller.getVideoById);
router.post("/", controller.addVideo);
router.put("/incr/:id", controller.incrementRating);
router.put("/decr/:id", controller.decrementRating);
router.delete("/:id", controller.deleteVideo);


module.exports = router;
