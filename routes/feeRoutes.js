const express=require('express');
const {getAllFee,addFee}=require('./../controllers/feeController')
const router=express.Router();


router.route('/').get(getAllFee)
                 .post(addFee)







module.exports=router