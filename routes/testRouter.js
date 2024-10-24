const express=require('express');
const { testusercontroller } = require('../controller/testController');

//router object
const router=express.Router()

//router for testing 
router.get('/',testusercontroller);

//export
module.exports=router