var mongoose=require('mongoose');
var express=require('express');
//var bcrypt=require('bcrypt');
//var nodemailer=require('nodemailer');
//var randomstring=require('randomstring');
path=require('path');
/*
"google-map-react": "^1.1.5",
    "mongoose": "^5.9.10",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-geolocated": "^3.0.1",
    "react-google-maps": "^9.4.5",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0",
    "typescript": "^3.8.3"  
*/

app=express();

app.use(express.static(path.join(__dirname, 'myfirstreactnpx/build')));

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','build','index.html'));
	
});


//passport=require('passport');
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));   app.use(bodyParser.json());

//require('./server/security/passport.js')(passport);   
//require('./server/routes/mainRoutes.js')(app,passport,bcrypt,nodemailer);

var port = 8080;

app.listen(port,()=>{console.log("Server On");}); 

