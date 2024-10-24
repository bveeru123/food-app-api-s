const express=require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { createresturantcontroller, getallresturantconstructor, getrseturantByidcontroller, deleteresturantByidcontroller } = require('../controller/resturantcontroller');


//router object
const router=express.Router();


//routes
//CREATE RESTURANT
router.post('/create',authmiddleware,createresturantcontroller)

//get all resturant
router.get('/getall',getallresturantconstructor)

//get resturant by id
router.get('/get',getrseturantByidcontroller)

//delete resturant by id
router.delete('/delete',deleteresturantByidcontroller)

//export
module.exports=router;