const express=require("express");
const router=express.Router();

const {capturepayment,sendPaymentSuccessEmail, verifysignature}=require("../controllers/Payment");

const {auth,isStudent,isInstructor,isAdmin}=require("../middlewares/auth");

router.post("/capturePayment",auth,isStudent,capturepayment);
router.post("/verifySignature",auth,isStudent,verifysignature);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail)


module.exports=router;