const db=require('../config/database1')

const placeodercontroller=async(req,res)=>{
    try{
        const {cart,order_id,user_id}=req.body;

        console.log("cart:", cart);
        console.log("order_id:", order_id);
        console.log("user_id:", user_id);
        
        
        //console.log("status:", status);
        if (!Array.isArray(cart)) {
            return res.status(400).send({
              success: false,
              message: "Provide all required fields"
            });
          }
        let total=0
        cart.forEach((item) => {
          total += item.price * item.quantity; 
         });
        const [userResult] = await db.execute('SELECT username FROM users1 WHERE id = ?', [user_id]);

        if (userResult.length === 0) {
          throw new Error("User not found");
        }
    
        const username = userResult[0].username


        // Prepare to insert each item into the order_items table
        const orderItemPromises = cart.map(async item => {

        // Extract food_id from foodschema
          const [foodResult] = await db.execute('SELECT food_id FROM foodschema WHERE title = ?',[item.title]);
          console.log("Food Result:", foodResult);
  
        if (foodResult.length === 0) {
          throw new Error(`Food item not found: ${item.title}`);
        }
  
        const foodId= foodResult[0].food_id;
    
       const insert='insert into orderschema (order_id,food_id,username,payement) values(?,?,?,?);';
        const order=await db.execute(insert,[order_id,foodId,username,total]);});

        await Promise.all(orderItemPromises); 
        return res.status(500).send({
            success:true,
            message:"order placed successfully",
           
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in placing order api",
            error
        })
    }

}


//order status controller

const orderstatuscontroler=async(req,res)=>{
  try{
    const {order_id,status1}=req.body
    console.log("Order ID:", order_id);
    console.log("Status:", status1);

    //update order status by order id
    const[result]=await db.execute('update orderschema set status1=? where order_id=? ',[status1,order_id]);
    if (result.affectedRows === 0) {
      return res.status(404).send({
          success: false,
          message: "Order not found"
      });
  }

      return res.status(200).send({
      success:true,
      message:"uptaed status by"
    })

  }
  catch(error)
  {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in finding order status api",
            error
          })
  }
}



module.exports={placeodercontroller,orderstatuscontroler}