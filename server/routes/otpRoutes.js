module.exports=function(app,nodemailer,bcrypt,randomstring)
{
otp=null; otpFlag=null;
var randomstring=require('randomstring');
bcrypt=require('bcryptjs');

app.post('/passwordForgot',(req,res)=>{

user.findOne({email:req.body.email},(err,user1)=>{if(err)throw err; else if(!user1){res.send('Email Id not registered');}});	
	
global.otp=randomstring.generate(6);
var transporter = nodemailer.createTransport({
 service:'Gmail',
 auth: {
        user:'syedhasnain9163@gmail.com',
        pass:'****' //put your password
    }
});
const mailOptions = {
  from: 'syedhasnain9163@gmail.com', // sender address
  to: req.body.email, // list of receivers
  subject: 'Forgot Password', // Subject line
  text:'your otp to change password: '+global.otp //plain text body
};


transporter.sendMail(mailOptions, function (err, info) {
   if(err)
   { console.log(err); res.send({msg:'error'});}
   else
   {  console.log(info);  res.send({msg:'An OTP has been sent to your mail',otp:global.otp}); }
});	
	
});  

/*
app.post('/passwordChanged',(req,res)=>{
	if(global.otp===req.body.otp)global.otpFlag=global.otp; 	
	res.redirect('http://localhost:3000/updatePassword');
}); 
*/

app.post('/passwordUpdated',(req,res)=>{
	
	user.findOne({email:req.body.email},(err,user1)=>{if(err)throw err; else if(!user1){console.log('Email Id not registered');}
	else {
		  console.log('ok'); 
		 bcrypt.hash(req.body.pass,12).then(h=>{ 
user.updateOne({ email:req.body.email },{$set:{pass:h}}, (err, obj)=> {console.log('Password Reset');global.otp=null;global.otpFlag=null;}); 
		console.log(h); res.send({msg:'Password Updated Succesfully'});
		
		}).then((k)=>{console.log(k)}).catch(err=>res.send(err));		
	     }
	});	
});


}
