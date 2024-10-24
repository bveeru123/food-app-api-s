const db=require('../config/database1')

module.exports=async(req,res,next)=>{
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
        if(user.usertype!=="admin"){
            return res.status(400).send({
                success:false,
                message:"only admin able to access"
            })
        }
        else{
            next();
        }

    }catch(error){
        res.status(500).send({
            success:false,
            message:'please provide token',
            error
            
        });
    }
}