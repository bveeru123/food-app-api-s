const db=require('../config/database1')
const bcrypt=require('bcryptjs');

///get user info

const getusercontroller=async(req,res)=>{
    //res.status(500).send('user data')
    console.log('Request headers:', req.headers);
    console.log(req);
    console.log(req.body.id);
    try{

    //find user

        const {id}=req.body;
        console.log("id:",id);
        if (!id) {
          return res.status(400).send({
            success: false,
            message: "ID is required",
          });
        }
  
        //find user
        const [rows]=await db.execute('select * from users1 where id = ?',[id]);
        const user=rows[0];
        if(!user)
        {
          return res.status(404).send({
              success:false,
              message:"user not found"
          })
        }
  
        user.password=undefined
        res.status(500).send({
          success:true,
          message:" user got succesfully",
         
        })
    
      }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in getting user api',
            error
        })
      }
    
    
};
    

//UPDATE_USER CONTROLLER

const updateusercontroller=async(req,res)=>{
  try{
    //find user
    const {id}=req.body
    console.log(id);
    const rows=await db.execute('select * from users1 where id = ?',[id]);
    const user=rows[0];
    if(!user)
    {
      return res.status(404).send({
          success:false,
          message:"user not found"
      })
    }
    //UPDATE
    const{username,phonenumber}=req.body;
    if(username) user.username=username
    if(phonenumber) user.phonenumber=phonenumber

    //SAVE 
    
    const updateddata=await db.execute('UPDATE users1 SET username=? , phonenumber=? WHERE id=?',[username,phonenumber,id])
    if(!updateddata){
      return res.status(500).send("error in updating")
    }
    res.status(500).send({
      success:true,
      message:" user updated succesfully"
    })


  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:'error in updating user api',
        error
    })
  }


}



//UPDATE USER PASSWORD
const updateuserpassword=async(req,res,)=>{
  try{

    //find user
   const id = req.body;
   const {email,oldpassword,newpassword}=req.body
    
    if (!email||!oldpassword||!newpassword) {
      return res.status(400).send({
        success: false,
        message: " required all fields",
      });
    }
    const [rows]=await db.execute('select * from users1 where email= ?',[email]);
    const user=rows[0];
        if(!user)
    {
      return res.status(404).send({
          success:false,
          message:"user not found"
      })
    }

      if(oldpassword==newpassword){
         res.status(500).send({
          success:false,
          message:"old and new password are same"
        })
      }
     

      //cpmpare hashed password
      const match = await bcrypt.compare(oldpassword, user.password);
      if (!match) {
          return res.status(401).send({
              success: false,
              message: "Password not matched"
          });
       }
     

       //hashing password
       var salt=bcrypt.genSaltSync(10);
       const hashpassword=await bcrypt.hash(newpassword,salt)
       user.password=hashpassword;

       //SAVEING in database
       const updateddata=await db.execute('UPDATE users1 SET password=? WHERE email=?',[hashpassword,email])
      if(!updateddata){
        return res.status(500).send("error in updating")
            }
       res.status(200).send({
        success:true,
        message:"password updated successfulyl"
       })

  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:'error in password update api',
        error
    })
  }
}


//RESET_PASSWORD

const resetpassword=async(req,res)=>{
  try{
    const {email,newpassword,answer,id}=req.body
    if(!email||!newpassword||!answer){
      return res.status(500).send({
        success:false,
        mesage:"please provide all fields"
      })
     }

     const [rows]=await db.execute('select * from users1 where email=? AND answer=?',[email,answer]);
     const user=rows[0];
     console.log(req.body.answer);
     if(!user){
      return res.status(404).send({
        success:false,
        message:"user not found or invalid answer"
    })
  }
  //hashing password
  var salt=bcrypt.genSaltSync(10);
  const hashpassword=await bcrypt.hash(newpassword,salt)
  user.password=hashpassword;

  //instead of await.save we use this in sql
  const updateddata=await db.execute('UPDATE users1 SET password=? WHERE email=?',[hashpassword,email])
  if(!updateddata){
    return res.status(500).send("error in updating")
  }
  res.status(200).send({
    success:true,
    message:"password reset successfulyl",
    user:{
      email,
      answer

    }
   })

  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:'error in reset password api',
        error
    })
  }
}

//DELETE USER

const deleteusercontroller=async(req,res)=>{
  try{
    const {id}=req.body;
    consosle.log(id);
   
  const [rows]=await db.execute('DELETE from users1 WHERE id=?',[id])
    if(rows.affectedRows==0){
      return res.status(404).send("user not found")
    }
    res.status(500).send({
      message:'user deleted sucesfully'
    })

  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:'error in delete profile api',
        error
    })
  }

}


module.exports={getusercontroller,updateusercontroller,updateuserpassword,resetpassword,deleteusercontroller}