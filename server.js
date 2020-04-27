var mongoose=require('mongoose');
var express=require('express');
var session=require('express-session');
var bcrypt=require('bcrypt');
var nodemailer=require('nodemailer');
randomstring=require('randomstring');
path=require('path');


app=express();

//app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'QySpAJrjqoaUd32I',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static(path.join(__dirname, 'myfirstreactnpx/build')));

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','build','index.html'));
	
});


passport=require('passport');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));   app.use(bodyParser.json());

require('./server/security/passport.js')(passport);   
require('./server/routes/mainRoutes.js')(app,passport,bcrypt,nodemailer);

var port = 8080;

app.listen(port,()=>{console.log("Server On");}); 

