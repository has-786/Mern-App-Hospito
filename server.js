var mongoose=require('mongoose');
var express=require('express');
bcrypt=require('bcryptjs');
var nodemailer=require('nodemailer');
var randomstring=require('randomstring');
path=require('path');

app=express();

app.use(express.static(path.join(__dirname, 'client','build')));

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','build','index.html'));
});

passport=require('passport');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));   app.use(bodyParser.json());

var bcrypt;

require('./server/security/passport.js')(passport);   
require('./server/routes/mainRoutes.js')(app,passport,bcrypt,nodemailer,randomstring);

var port = process.env.PORT || 8080;

app.listen(port,()=>{console.log("Server On");}); 

