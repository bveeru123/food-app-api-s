const express=require('express');
const app=express();
const dotenv=require('dotenv');
const db=require('./config/database1');

const authRoutes = require('./routes/authroutes'); 
const foodRoutes = require('./routes/foodroutes'); 


app.use(express.json())


//configration
dotenv.config();

//route
//URL =>http://localhots:4000
app.use('/this',require('./routes/testRouter'))
app.use('/auth', authRoutes);
app.use(express.json());
app.use('/user',require('./routes/userroute'));
app.use('/resturant',require('./routes/resturantroutes'))
app.use('/food',foodRoutes);
app.use('/order',require('./routes/orderroutes'))


app.get('/',(req,res)=>
{
    return res.status(200).send("<h1>Welcome to Food server </h1>");
});

//PORT
const PORT=process.env.PORT;

//Listen
app.listen(PORT,()=>
{
    console.log(` node server is running on ${PORT}`);
});