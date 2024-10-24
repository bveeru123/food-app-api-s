const express=require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { placeodercontroller, orderstatuscontroler } = require('../controller/ordercontroller');
const adminmiddleware = require('../middlewares/adminmiddleware');

//router object
const router=express.Router();

//place order post
router.post('/placeorder',authmiddleware,placeodercontroller);


//order status
router.post('/orderstatus',adminmiddleware,orderstatuscontroler)



//export
module.exports=router;