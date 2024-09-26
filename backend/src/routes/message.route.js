const express= require("express");
const protectRoute = require("../middleware/protectRoute");
const router= express.Router();
const messageController= require("../controllers/message.controller");

router.get("/conversations", protectRoute, messageController.getUsersForSideBar);
router.get("/:id", protectRoute, messageController.getMessage);
router.post("/send/:id", protectRoute, messageController.sendMessage);

module.exports=router;