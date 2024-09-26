const express= require("express");
const router= express.Router();
const authController= require("../controllers/auth.controller");
const protectRoute = require("../middleware/protectRoute");

router.get("/me",protectRoute, authController.getMe)
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);



module.exports = router;