const db=require('../config/database1');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registercontroller=async(req,res)=>{
    try{
        const{username,email,password,phonenumber,answer,usertype}=req.body;

        //validation
        if(!username||!email||!password||!phonenumber||!answer||!usertype)
        {
            return res.status(400).send({
                success:false,
                message:'please provide all fields'
            });
        }
              // Check existing user
            const [rows]=await db.execute("select * from users1 where email=? ",[email]);
            const existingUser=rows[0];

            if (existingUser) {
                return res.status(200).send({
                success: false,
                message: "User already exists"
                });
             }


            //hashing password
            var salt=bcrypt.genSaltSync(10);
            const hashpassword=await bcrypt.hash(password,salt,)

             // Create new user ----if user is not existed means it creates new user and hashing password with bcrypt
             console.log('Received input:', { username,email,password:hashpassword,   phonenumber,answer });
             const userr=await db.execute('insert into users1(username,email,password,phonenumber,answer,usertype) values(?,?,?,?,?,?)',[username,email,hashpassword,phonenumber,answer,usertype]);
                if(!userr){
                    return res.status(404).send({
                    success:false,
                    message:'error in insert field'
                    })
                }
                    return res.status(201).send
                    ({
                        success:true,
                        message:"user successfully created",
                        userr: {
                            username,
                            email,
                            phonenumber,
                            answer,
                            usertype
                    }
                })
            }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in register api',
            error
        });


    }
}

//Login controller
const logincontroller=async(req,res)=>{
    try{
        const {email,password,id}=req.body;
        //validation
        if(!email||!password)
        {
            return res.status(400).send({
                success:false,
                message:'please provide email or password'
            });
        }

        //check user
        const [rows] = await db.execute("SELECT * FROM users1 WHERE email = ?", [email]);
        let validuser = rows[0];
        console.log('Valid user:', validuser);
      
       if(!validuser){
        return res.status(200).send({
            success:false,
            message:"user not found"
        })
       }

        //cpmpare hashed password
        const match = await bcrypt.compare(password, validuser.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Password not matched"
            });
        }
        //token   generation ----------------
      const userid=validuser.id;
        const token = jwt.sign({id:validuser.id}, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('JWT Secret:', process.env.JWT_SECRET);
        console.log(validuser);
        console.log(userid);
        validuser.password=undefined
        res.status(200).send({
            success:true,
            message:"user found login succsesfully",
            validuser,
            token
           
            
        })
    }

    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login api',
            error
        });
    }
}



//Logout controller

// Initialize a Set to store blacklisted tokens
const blacklistedToken = new Set();
const logoutcontroller = (req, res) => {
  try {
         const authorizationHeader = req.headers["authorization"];
            if (!authorizationHeader) {
            return res.status(400).send("Token not provided");
            }
            

             // Split the authorization header to get the token
            const token = authorizationHeader.split(" ")[1];
           
          // Check if the token is provided after the "Bearer" keyword
          if (!token) {
            return res.status(400).send("Token not provided");
            }
            

            // Add the token to the blacklisted tokens set (to invalidate it)
            blacklistedToken.add(token);

         return res.status(200).send({
         success: true,
          message: "Logout successful"
         });
     } 
  
      catch (error) {
        return res.status(500).send({
        success: false,
        message: "Error in logout API",
        error
        });
      }
};

module.exports={registercontroller,logincontroller,logoutcontroller};