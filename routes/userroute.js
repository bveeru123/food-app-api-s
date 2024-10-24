const express=require('express');
const { getusercontroller, updateusercontroller, updateuserpassword, resetpassword, deleteusercontroller } = require('../controller/usercontroller');
const authmiddleware = require('../middlewares/authmiddleware');

//router object
const router=express.Router();



//GET _USER
router.get('/getuser',authmiddleware,getusercontroller)

//UPDATE USER
router.put('/updateuser',authmiddleware,updateusercontroller)

//UPDATE PASSWORD
router.post('/updatepassword',authmiddleware,updateuserpassword)


//RESET_PASSWORD
router.post('/resetpassword',authmiddleware,resetpassword)

//DELETE user
router.delete('/deleteuser',authmiddleware,deleteusercontroller)

//export
module.exports=router;