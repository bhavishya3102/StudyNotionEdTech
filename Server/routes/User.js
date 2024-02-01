const express = require("express")
const router = express.Router();

const {sendOtp, signup ,login, changepassword}=require("../controllers/Auth");

const {resetPasswordtoken ,resetpassword}=require("../controllers/ResetPassword");

const {auth}=require("../middlewares/auth");

// create Routes

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendotp",sendOtp);
router.post("/changepassword",auth,changepassword);


router.post("/reset-password-token",resetPasswordtoken);
router.post("/reset-password",resetpassword);

module.exports=router;