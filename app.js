// const cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');   //cookie client side pr to save ho jati ha lkn agr osy server side read/console krna ho to wo nai hota q k wo encoded hota ha isi leay cookie-parser use krty hain 
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
app.use(cookieParser())

//------------- send cookie 
app.get('/', function (req, res) {
    // server sy browser pr kosh data save krvana = cookie
    //cokkie ko alag alag nai baja jata blk ya automatically chali jati ha or save rahti ha agr ham ny ak dafa snd kr di ho to
    res.cookie('name', "usman ali")
    res.send('cookie sended')
})

//---------read cookie in server side using cookie parser
app.get('/read', function (req, res) {

    // this is due to cookie parser

    console.log(req.cookies)

    res.send('cookie readed')
})

//--------- hash (encrypt) the password using bcrypt 
// generate a salt and hash on separate function calls
app.get('/auth', function (req, res) {
    const saltRounds = 10;    //is me ay ga k kitny number jo k ham hamasha 10 rakhty hain
    const myPlaintextPassword = 'usmanali';   // is me wo pasword aya kry ga jo user enter kiya kary ga 

    bcrypt.genSalt(saltRounds, function (err, salt) {
        // genSalt is like generate the salt also ka string that use to convert the plain text password inho hash string
        // basically salt ko string hoti ha jo genSalt ny bnai ho 
        console.log('Salt:', salt)
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            // Store hash in your password DB.
            console.log('hash:', hash)
        });
    });

    res.send('password hashed')
})

// ----decrypt password (yani password ko compaire krna like plainTextPassword and haspassword )
app.get('/comp', function (req, res) {
    // -------syntax
    // bcrypt.compare(planTextPassword,hashPassword,function(err,result){

    // })
    bcrypt.compare("usmanali", '$2b$10$E29qocgrarTJ3S6Xeo52ruTmb6CCmOwiV9urDqhwIvXHVfljzy.H6', function (err, result) {

        console.log("Result:",result)
        res.send(result)
    })
})

// *********jwt******************
app.get('/jwt', function (req, res) {

//    let token= jwt.sign(uniqueThing,'secret')
   let token= jwt.sign({email:"abc@gmail.com"},'secret')
   res.cookie('token', token)
   res.send('token set in the cookie ')
})

//decode data from cookie.token
app.get('/jwtRead', function (req, res) {

    //    let token= jwt.sign(uniqueThing,'secret')
       let data= jwt.verify(req.cookies.token,'secret')
       console.log('data', data)
       res.send('done ')
    })



app.listen(8000)