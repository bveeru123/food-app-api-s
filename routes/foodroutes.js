const express=require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { createfoodcontroller, getallfoodcontroller, foodbyidcontroller, deletefoodbyidcontroller, updatefoodcontroller } = require('../controller/foodcontroller');


//router object
const router=express.Router();


// create food routes
router.post('/create',authmiddleware,createfoodcontroller);
 
//get all food
router.get('/getall',getallfoodcontroller);

//get food by id
router.get('/getbyid',foodbyidcontroller);

//delete food by id
router.delete('/delete',authmiddleware,deletefoodbyidcontroller)

//update food
router.put('/update',authmiddleware,updatefoodcontroller)


//export
module.exports=router;