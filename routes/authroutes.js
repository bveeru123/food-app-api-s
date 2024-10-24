const express=require('express');
const { registercontroller, logincontroller, logoutcontroller } = require('../controller/authcontroller');


//router object
const router=express.Router();


//register rooute
router.post('/register',registercontroller)

//login route
router.post('/login',logincontroller)

//logout route
router.post('/logout',logoutcontroller)

//export
module.exports=router;