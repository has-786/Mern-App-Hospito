module.exports=function(app,passport,bcrypt,nodemailer)
{require('../security/passport.js')(passport);
cors=require('cors');
app.use(cors());
db.con(mongoose);
product=db.product;
user=db.user;
order=db.order;
cart=db.cart;
appoint=db.appoint;
hospital=db.hospital;


name=null; 
f=0;
msg="Already Requested";	

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] } )  );

app.get('/auth/google/callback',(req,res,next)=>{
  passport.authenticate('google',(err)=>{ if(err)console.log(err); console.log(global.name);
  res.redirect('http://localhost:3000');   })(req,res,next); }  );
  


app.post('/getDoctors',(req,res)=>{
	var name=req.body.name;
		 user.find({type:'Doctor',$or:[ {name:{$regex:name,$options:'i'}},{specialist:{$regex:name,$options:'i'}} ]},(err,doctor)=>{
			if(err)console.log(err);
			else {console.log(doctor);res.send(doctor);}
		 });
});


app.post('/addAppoint',(req,res)=>{
	global.msg="Requested";
if(!global.name){global.msg='Please Login First'; }
else
{
	  appoint.find({name:req.body.name,docname:req.body.docname},(err,appoint1)=>{
	  console.log(appoint1);
	  if(appoint1.length==0){var Newappoint=new appoint({name:req.body.name,docname:req.body.docname,stat:req.body.name+'stat',timestamp:req.body.name+'time'});
		Newappoint.save((err,appoint1)=>{
			if (err) res.send({msg:"Error Occured"}); 
			else
			{
				global.msg="Requested";
				var transporter = nodemailer.createTransport({service:'Gmail',auth: {user:'syedhasnain9163@gmail.com',pass:'labbaikyahussain'}});
				const mailOptions = {from: 'syedhasnain9163@gmail.com', to: req.body.email, subject: 'Appointment Request', text:'Appointment Request....Please Check Hospito'};
				transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});    
				console.log(appoint1); 		
			}
		  });
		  }
	 //res.send({msg:global.msg});
	});
	
}
		 res.send({msg:global.msg});

		
		
});
app.post('/removeAppoint',(req,res)=>{
		appoint.findOneAndDelete({ name:req.body.name,docname:req.body.docname }).then((appoint1)=>{
			
   var  transporter = nodemailer.createTransport({service:'Gmail',auth: {user:'syedhasnain9163@gmail.com', pass:'*********' //put your password
									}});
   const mailOptions = {from: 'syedhasnain9163@gmail.com', to: req.body.email,subject: 'One request cancelled', text:'Appointment Request Cancelled....Please Check Hospito'};
   transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});	
			
			
		console.log('Cancelled');res.send({msg:'Cancelled'});}).catch((err)=> {if(err)console.log(err);  });
});
  app.post('/showAppoint',(req,res)=>{
	  if(!global.name){return;}

		 appoint.find({name:req.body.name},(err,appoint1)=>{
			if(err)console.log(err);
			else {console.log(appoint1);res.send(appoint1);}
		 });
});
app.post('/showAppointToDoctor',(req,res)=>{
	if(!global.name){res.redirect('http://localhost:3000/signin');return;}

		 appoint.find({docname:req.body.docname},(err,appoint1)=>{
			if(err)console.log(err);
			else {console.log(appoint1);res.send(appoint1);}
		 });
});  

  app.post('/updateAppoint',(req,res)=>{
		 appoint.updateOne({name:req.body.name,docname:req.body.docname},{stat:req.body.stat,timestamp:req.body.timestamp},(err,appoint1)=>{
			if(err)console.log(err);
			else {console.log(appoint1); 
					user.findOne({name:req.body.name},(err,user1)=>{
						if(err)console.log(err);
						else {
							var  transporter = nodemailer.createTransport({service:'Gmail',auth: {user:'syedhasnain9163@gmail.com', pass:'*********' //put your password}}}
															     }}}
   const mailOptions = {from: 'syedhasnain9163@gmail.com', to: user1.email,subject: 'Appointment at Hospito', text:'Appointment Status Updated..Please Check Hospito'};
   transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});	
			
			
						}
						
						
					});
   
			
			
			res.send({msg:req.body.stat});}
		 });
}); 

app.post('/addHospital',(req,res)=>{
 var Newhospital=new hospital({name:req.body.name,address:req.body.address,email:req.body.email,phone:req.body.phone});
		Newhospital.save((err,hospital1)=>{if (err) res.send({msg:"Error Occured"}); else {
			console.log(hospital1);}  });
});


app.post('/showHospital',(req,res)=>{
var name=req.body.name; 
 hospital.find({$or:[ {name:{$regex:name,$options:'i'}},{address:{$regex:name,$options:'i'}} ]},(err,hospital1)=>{
			if(err)console.log(err);
			else {console.log(hospital1);res.send(hospital1);}
		 });
});




app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['user_friends', 'manage_pages'] } )  );

app.get('/auth/facebook/callback',(req,res,next)=>{
  passport.authenticate('facebook',(err)=>{ if(err)console.log(err); console.log(global.name); res.redirect('http://localhost:3000/'); })(req,res,next); }  );


app.get('/auth/linkedin',
  passport.authenticate('linkedin', { }));  

app.get('/auth/linkedin/callback', (req,res,next)=>{
  passport.authenticate('linkedin',(err)=>{ if(err)console.log(err); console.log(global.name); 
  res.redirect('http://localhost:3000/');   })(req,res,next); }  );
  
app.post('/localSignin',(req,res,next)=>{
	console.log(req.body);
	global.name=req.body.name; 	                          
	 user.findOne({name:global.name})
    .then(function(user1) {
		if(user1)return bcrypt.compare(req.body.pass,user1.pass);
    })
    .then(function(samePassword) {
         console.log(samePassword);if(samePassword==true){console.log('Signed In SuccessFully'); res.redirect('http://localhost:3000/');}
		 else {global.name=null; res.redirect('http://localhost:3000/signin');}
     })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
}  );

app.post('/localSignup',(req,res,next)=>{
	console.log(req.body);   global.name=req.body.name; global.mail=req.body.email; type=req.body.type;
	if(type==='Doctor')specialist=req.body.specialist; else specialist=null;
	user.findOne({$or:[{name:req.body.name},{email:req.body.email}]},(err,user1)=>{
	   if(err)console.log(err); 
	   else if(user1){ console.log('Already A User'); 	res.redirect('http://localhost:3000/signup');  }
		else{
			    bcrypt.hash(req.body.pass,12).then(
				function(hashedPassword) {
							var Newuser=new user({name:req.body.name,email:req.body.email,pass:hashedPassword,type:type,specialist:specialist});
							Newuser.save((err,user1)=>{if(err)console.log(err); else console.log(user1); });}).
				then(function() { res.redirect('http://localhost:3000/'); }).
				catch(  function(error){console.log("Error saving user: ");	console.log(error);next();   });
		}
	});
  });
  
  app.get('/showAllProds',(req,res)=>{
	product.find({},(err,prods)=>{
		if(err)console.log(err);
		else  res.send(prods);  
	});    
  });
    app.get('/showAllDoctors',(req,res)=>{
	user.find({type:'Doctor'},(err,doctors)=>{
		if(err)console.log(err);
		else  res.send(doctors);  
	});  
  });
  
      app.get('/showAllHospitals',(req,res)=>{
	hospital.find({},(err,hospital1)=>{
		if(err)console.log(err);
		else  res.send(hospital1);  
	});  
  });
  
  
  
app.get('/profile',isSignedin,(req,res)=>{
	console.log("hi");
	console.log(global.name+" ");
	user.findOne({name:global.name},(err,user1)=>{
	res.send({username:global.name,type:user1.type});
    });
});
function isSignedin(req,res,next)
{
	if(global.name)return next();
	res.redirect('http://localhost:3000/signin');
}
app.get('/signout',(req,res,next)=>{
	req.logout(); global.name=null; console.log('Signed Out SuccessFully');
	res.redirect('http://localhost:3000/');
});


	
}
