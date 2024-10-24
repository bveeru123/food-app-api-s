const testusercontroller=(req,res)=>
{
    try{
        res.status(200).send("<h1>Welcome to another</h1>");
    }catch(error){
        console.log("error in test api",error);
    }

};


module.exports={testusercontroller};