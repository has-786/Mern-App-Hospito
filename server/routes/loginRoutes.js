module.exports=function(app,passport,bcrypt,nodemailer)
{require('../security/passport.js')(passport);
cors=require('cors');
app.use(cors());
//db.con(mongoose);
product=db.product;
user=db.user;
order=db.order;
cart=db.cart;
donation=db.donation;


name=null; 
var type=null;
f=0;
msg="Already Requested";	

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] } )  );

app.get('/auth/google/callback',(req,res,next)=>{
  passport.authenticate('google',(err)=>{ if(err)console.log(err); console.log(global.name);
 res.send('Hi '+global.name);  })(req,res,next); }  );



app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['user_friends', 'manage_pages'] } )  );

app.get('/auth/facebook/callback',(req,res,next)=>{
  passport.authenticate('facebook',(err)=>{ if(err)console.log(err); console.log(global.name); res.send({user:global.name}); })(req,res,next); }  );


app.get('/auth/linkedin',
  passport.authenticate('linkedin', { }));  

app.get('/auth/linkedin/callback', (req,res,next)=>{
  passport.authenticate('linkedin',(err)=>{ if(err)console.log(err); console.log(global.name); 
res.send({msg:'Signed In SuccessFully'});  })(req,res,next); }  );
  
app.post('/localSignin',(req,res,next)=>{
	console.log(req.body);
	
	global.name=req.body.name;  	                          
	 user.findOne({name:global.name})
    .then(function(user1) {
		if(user1){type=user1.type; return bcrypt.compare(req.body.pass,user1.pass); }
    })
    .then(function(samePassword) {
         console.log(samePassword);if(samePassword==true){console.log('Signed In SuccessFully');}
		 else global.name=null; 
		 if(global.name)user.findOne({name:global.name},(err,user2)=>{	console.log(user2.type);	res.send({username:global.name,type:user2.type});  }); 
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
	   else if(user1){ console.log('Already A User');console.log(user1); global.name=null;}
		else{
			    bcrypt.hash(req.body.pass,12).then(
				function(hashedPassword) {
				var Newuser=new user({name:req.body.name,email:req.body.email,pass:hashedPassword,type:type,specialist:specialist});			
				Newuser.save((err,user2)=>{ if(err)console.log(err); else{ console.log(user2); global.name=user2.name;  }  });
					  }).catch(  function(error){console.log("Error saving user: ");	console.log(error);  next();   });
		}
		res.send({username:global.name}); 
	});
  });
 
	
app.post('/driverSignup',(req,res,next)=>{
	console.log(req.body);   global.name=req.body.name;  car=req.body.car;
	ambulance.findOne({$or:[{name:req.body.name},{phone:req.body.phone}]},(err,user1)=>{
	   if(err)console.log(err); 
	   else if(user1){ console.log('Already A User');console.log(user1); global.name=null;}
		else{
			    bcrypt.hash(req.body.pass,12).then(
				function(hashedPassword) {
				var Newambulance=new ambulance({name:req.body.name,pass:hashedPassword,car:car,lat:null,lng:null,available:1,phone:req.body.phone});			
				Newambulance.save((err,user2)=>{ if(err)console.log(err); else{ console.log(user2); global.name=user2.name;  }  });
					  }).catch(  function(error){console.log("Error saving user: ");	console.log(error);  next();   });
		}
		
		res.send({drivername:global.name}); 
	});
  });
	
	

app.post('/driverSignin',(req,res,next)=>{
	console.log(req.body);
	
	global.name=req.body.name;  	                          
	 ambulance.findOne({name:global.name})
    .then(function(user1) {
		if(user1)return bcrypt.compare(req.body.pass,user1.pass);
    })
    .then(function(samePassword) {
         console.log(samePassword);if(samePassword==true){console.log('Signed In SuccessFully');}
		 else global.name=null;
		
		res.send({drivername:global.name});
     })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    }); 
}  );	
	
	
}
