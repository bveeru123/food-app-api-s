const db=require('../config/database1')

const createresturantcontroller=async(req,res)=>{
    try{
        const{Title,Foods,Pickup,Delivery,rating,ratingcount,resturantcode,coords}=req.body;
        //validation
        if(!Title||!coords){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }


        //create resturant
        const insertdata='INSERT INTO resturantschema (Title, Foods, Pickup, Delivery, rating, ratingcount, resturantcode, cords) VALUES (?,?,?,?,?,?,?,?);';
        const newresturant=await db.execute(insertdata,[Title,Foods,Pickup,Delivery,rating,ratingcount,resturantcode,coords]);

        return res.status(200).send({
            success:true,
            message:"resturant created successfully",
            newresturant:{
                Title,Foods,Pickup,Delivery,rating,ratingcount,resturantcode,coords
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in creating resturant api",
            error
        })
    }

}


//gett all rsturants controller
const getallresturantconstructor=async(req,res)=>{

    try{
        const resturants=await db.execute('select * from resturantschema');

        //validation
        if(!resturants){
            return res.status(400).send("no avaliable resturant")
        }

        return res.status(200).send({
            success:true,
            totalcount:resturants.length,
            message:"success in getting all resturants ",
            
        })

    }catch(error){
        return res.status(500).send({
            success:false,
            message:"error in getallresturant api",
            error
        })
    }
}


//get resturant by id controller
const getrseturantByidcontroller=async(req,res)=>{
    try{
        const {id}=req.body;
        //console.log(req);
        console.log(id);
        if(!id){
            return res.status(400).send("id is required")
        }
        const [rows]=await db.execute('select * from  resturantschema where id=?',[id])
        const rseturantByid=rows[0]
        console.log(rseturantByid)
            if(rseturantByid.length==0){

                return res.status(400).send("resturant not found")
            }
        return res.status(200).send({
            success:true,
            message:"rseturant got successfully",
            rseturant:rows[0]
        })


    }catch(error){
        return res.status(500).send({
            success:false,
            message:"error in get resturant by id api",
            error
        })
    }
}


//delete resturant by id controller
const deleteresturantByidcontroller=async(req,res)=>{
    try{
        const {id}=req.body
        //validation
        if(!id){
            return res.status(400).send("id is required")
        }

        //delete resturant by id
        const [rows]=await db.execute('DELETE from resturantschema WHERE id=?',[id])
        const { affectedRows } = rows;
    
        if (affectedRows === 0) {
          return res.status(404).send({
            success: false,
            message: "No restaurant found with the provided ID"
          });
        }
        
        return res.status(200).send({
            success:true,
            message:"deletion success"
        })


    }catch(error){

        return res.status(400).send({
            success:false,
            message:"error in deletig rseturant by id",
            error
        })
    }

}

module.exports={createresturantcontroller,
    getallresturantconstructor,
    getrseturantByidcontroller,
    deleteresturantByidcontroller}