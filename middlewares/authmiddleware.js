const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
    try{

        //token
        const token=req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.jwt_secret,(err,decode)=>{
            if(err){
                return res.status(400).send({
                    success:false,
                    message:"un-authorization user"
                })
            }
            else{
                req.body.id=decode.id;
                next();
            }
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'please provide token',
            error
            
        });
    }
}