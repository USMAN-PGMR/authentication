// const cookieParser = require('cookie-parser');
const cookieParser=require('cookie-parser') ;   //cookie client side pr to save ho jati ha lkn agr osy server side read/console krna ho to wo nai hota q k wo encoded hota ha isi leay cookie-parser use krty hain 
const express=require('express');

const app = express();
app.use(cookieParser())


app.get('/',function(req,res){
    // server sy browser pr kosh data save krvana = cookie
    //cokkie ko alag alag nai baja jata blk ya automatically chali jati ha or save rahti ha agr ham ny ak dafa snd kr di ho to
    res.cookie('name',"usman ali")
    res.send('cookie sended')
})
app.get('/read',function(req,res){
    console.log(req.cookies)
     
    res.send('cookie readed')
})




app.listen(8000)