const db=require('../config/database1')


//create food controller
const createfoodcontroller=async (req,res)=>{
    try{
        const {food_id,title,foodtags,description,price,isavaliable,rating}=req.body;

        //validation
        if(!food_id||!title||!foodtags||!price||!isavaliable||!rating)
        {
            return res.status(400).send({
                success:false,
                message:'please provide all fields'
            })
        }

        //insert the data into
        const insertdata='insert into foodschema(food_id,title,foodtags,description,price,isavaliable,rating) values(?,?,?,?,?,?,?);';
        const newfood=await db.execute(insertdata,[food_id,title,foodtags,description,price,isavaliable,rating]);

        return res.status(200).send({
            success:true,
            message:"resturant created successfully",
            newfood:{
                food_id,title,foodtags,description,price,isavaliable,rating
               
            }
        })

    }catch(error){
        console.log(error);
       return  res.status(500).send({
            success:false,
            message:"error in creating food api",
            error
        })
    }
};


//get all food controller

const getallfoodcontroller=async (req,res)=>{
    try{
       const [rows] = await db.execute('SELECT * FROM foodschema');
        
        // Check if rows (foods) are found
        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No food found'
            });
        }
        console.log('Data from database:', rows);

        return res.status(200).send({
            success:true,
            message:"food found",
            food:rows
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in creating get all food api",
            error
        })
    }

}


//get single food

const foodbyidcontroller=async(req,res)=>{
    try{
        const {food_id}=req.body;
        if(!food_id){
           return  res.status(200).send({
                success:false,
                message:"please provide all fields"
            })
        }

        const [rows]=await db.execute('select * from  foodschema where food_id=?',[food_id])
        const foodByid=rows[0]
        console.log(foodByid)
            if(foodByid.length==0){

                return res.status(400).send("food not found")
            }
        return res.status(200).send({
            success:true,
            message:"food got successfully",
            food:rows[0]
        })

    }catch(error){
        console.log(error);
       return  res.status(500).send({
            success:false,
            message:"error in creating getting food by id api",
            error
        })
    }
}


//delet by id controller 

const deletefoodbyidcontroller=async(req,res)=>{
    try{
        const {food_id}=req.body;
        if(!food_id){
            res.status(200).send({
                success:false,
                message:"please provide all fields"
            })
        }

        const [rows]=await db.execute('delete from  foodschema where food_id=?',[food_id])
        const affectedrows=rows
        console.log(affectedrows)
            if(affectedrows==0){

                return res.status(400).send("food not found")
            }
        return res.status(200).send({
            success:true,
            message:"food deleted successfully",
            food:rows[0]
        })

    }catch(error){
        console.log(error);
       return  res.status(500).send({
            success:false,
            message:"error in deleting food by id api",
            error
        })
    }

}


//update food controller

const updatefoodcontroller=async(req,res)=>{
    try{
        const {food_id,title,foodtags,description,price,isavaliable,rating}=req.body;
        if(!food_id){
             return res.status(400).send({
                success:false,
                message:"please provide all fields"
            })
        }
        const [rows]=await db.execute('select * from  foodschema where food_id=?',[food_id])
        const food=rows[0]
        if(!food)
        {
            return res.status(404).send({
                success:false,
                message:"no food found"
            })
        }

        if(title) food.title=title
        if(foodtags) food.foodtags=foodtags
        if(description) food.description=description
        if(price) food.price=price
        if (typeof isavaliable !== 'undefined') food.isavaliable = isavaliable;
        if(rating) food.rating=rating
        
        const updatefood = `
        UPDATE foodschema 
        SET title = ?, foodtags = ?, description = ?, price = ?, isavaliable = ?, rating = ? 
        WHERE food_id = ?;
    `;
        const [result]=await db.execute(updatefood,[title,foodtags,description,price,isavaliable,rating,food_id])
        if(result.affectedRows==0){
            return res.status(500).send("error in updating")
          }

          return res.status (200).send({
            success:true,
            message:"updated succesfully"
          })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in updating food by id api",
            error
        })
    }
}

module.exports={createfoodcontroller,getallfoodcontroller,foodbyidcontroller,deletefoodbyidcontroller,updatefoodcontroller};