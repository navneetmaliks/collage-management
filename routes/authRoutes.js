const express=require('express');
const authController=require('./../controllers/authController')
const router=express.Router();

router.route('/login').post(authController.signin);
router.route('/register').post(authController.register);
router.route('/forgotPassword').post(authController.forgotPassword)





module.exports=router