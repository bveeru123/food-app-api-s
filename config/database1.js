const mysql=require('mysql2');

//establishing data base connection
const pool=mysql.createPool({
    host:'Localhost',
    user:'root',
    database:'resturant',
    password:'Veeru123@'

});


module.exports=pool.promise();