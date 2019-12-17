module.exports=function(app,passport,bcrypt,nodemailer){

require('./loginRoutes.js')(app,passport,bcrypt,nodemailer);
require('./otpRoutes.js')(app,nodemailer,bcrypt);
require('./productRoutes.js')(app);
require('./orderRoutes.js')(app);


/*
otp=null;  otpFlag=null;

app.get('/signup',(req,res)=>{  res.sendFile(path.join(__dirname+'/../static/signup.html'));  });

app.get('/signin',(req,res)=>{  res.sendFile(path.join(__dirname+'/../static/signin.html'));  });

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] } )  );

app.get('/auth/google/callback',(req,res,next)=>{
  passport.authenticate('google',(err)=>{ if(err)console.log(err); console.log(global.name);
  res.redirect('/profile');   })(req,res,next); }  );
  
app.get('/forgotPassword',(req,res)=>{res.sendFile(path.join(__dirname+'/../static/forgotPassword.html'));});
app.post('/passwordForgot',(req,res)=>{

user.findOne({email:req.body.email},(err,user1)=>{if(err)throw err; else if(!user1){res.send('Email Id not registered');}});	
	
global.otp=randomstring.generate(6);
var transporter = nodemailer.createTransport({
 service:'Gmail',
 auth: {
        user:'syedhasnain9163@gmail.com',
        pass:'labbaikyahussain'
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
   { console.log(err); res.send(err);}
   else
   {  console.log(info);  res.redirect('/changePassword');}
});	
	
});  

app.get('/changePassword',(req,res)=>{res.sendFile(path.join(__dirname+'/../static/changePassword.html'));});
app.post('/passwordChanged',(req,res)=>{
	if(global.otp===req.body.otp)global.otpFlag=global.otp; 	
	res.redirect('/updatePassword');
}); 
app.get('/updatePassword',isOtp,(req,res)=>{res.sendFile(path.join(__dirname+'/../static/updatePassword.html'));});

app.post('/passwordUpdated',(req,res)=>{
	
	user.findOne({email:req.body.email},(err,user1)=>{if(err)throw err; else if(!user1){console.log('Email Id not registered');}
	else {
		  console.log('ok');
		 bcrypt.hash(req.body.pass,12).then(h=>{ 
user.updateOne({ email:req.body.email },{$set:{pass:h}}, (err, obj)=> {console.log('Password Reset');global.otp=null;global.otpFlag=null;res.send('Password Reset Successfully');}); 
		console.log(h);
		
		}).then(()=>{}).catch(err=>res.send(err));		
	     }
	});	
});
function isOtp(req,res,next)
{
	if(global.otpFlag)return next();
	res.redirect('/changePassword');
}
 
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['user_friends', 'manage_pages'] } )  );

app.get('/auth/facebook/callback',(req,res,next)=>{
  passport.authenticate('facebook',(err)=>{ if(err)console.log(err); console.log(global.name);
  res.redirect('/profile');   })(req,res,next); }  );

app.post('/showCart',(req,res)=>{
	username=req.body.name;
	user.findOne({name:username},(err,user1)=>{
		id=user1._id; 
		if(err)console.log(err); 
		else if(!user1)console.log("No such cart");	
		else{
			cart.findOne({name:username},(err,cart1)=>{   res.send(cart1.json());     }); 
		}
		
	}); 
});

app.post('/showProduct',(req,res)=>{
	var name=req.body.name; var dis=req.body.disease;
	product.findOne({$or:[ {prodName:/name/},{disease:/dis/} ]},(err,prod1)=>{ 
		if(err)console.log(err); 
		else if(!prod1)console.log("No such medicine");	
		else  res.send(prod1.json());                            
	}); 
});
  

app.post('/addToCart',(req,res,next)=>{
  
  username=req.body.name;
  product=req.body.product;
  user.findOne({name:username},(err,user1)=>{
	  	id=user1._id; 
		
		if(err){console.log(err); }
		else if(!user1)
		{
			console.log("fresh cart");
			cart.findOne({userId:id},(err,cart1)=>{
			if(err){console.log(err); }
			else if(!cart1)
			{
				console.log('user not found in cart');
				prodArr=[]; prodArr.push(product);
				var Newcart=new cart({userId:id,prods:prodArr});
				Newcart.save((err,cart1)=>{if(err)console.log(err); else {console.log(cart1); res.send(cart1.json());} });
			} });
		}
		else {       
		cart.update({ userId: id},{ $push: {prods: product} },(err, cart1)=> { if (err) return handleError(err);console.log('Cart Updated ',cart1);});

			}
	});
});

app.post('/removeFromCart',(req,res,next)=>{
  
  username=req.body.name;
  prodId=req.body.prodId;
  user.findOne({name:username},(err,user1)=>{
		id=user1._id; 
		if(err)console.log(err); 
		else if(!user1)console.log("No such cart");	
		else    cart.update({ userId: id }, { $pull: { prods: { _id: prodId } }}, { safe: true},(err, obj)=> {res.send({obj});});
		
	}); 
});

prods=null;

app.post('/CreateOrder',(req,res)=>{
  var amount=req.body.amount;
  var instance = new Razorpay({ key_id: 'rzp_test_SQG8JPTfI1KtZ9', key_secret: 'yiDI2zVqXDY6iOKO2nx5JiaX'});
  var options = {
				amount:amount,  // amount in the smallest currency unit
				currency: "INR",
				receipt: "order_rcptid_11",
				payment_capture: '0'
		      };
	instance.orders.create(options, function(err, order) {	console.log(order);  res.send(order);  });
}); 
  
app.post('/CompleteOrder',(req,res)=>{
	var paymentId=req.body.paymentId;
	var username=req.body.username;
	var amount=req.body.amount;
	var payment=req.body.paymentMethod;
	user.findOne({name:username},(err,user1)=>{
		if(err){console.log(err); }
		else if(!user1){console.log('user not available');}
		else if(user1){
			id=user1._id;
			cart.findOneAndDelete({ userId:id }).then((cart1)=>{
				global.prods=cart1.prods;
			}).catch((err)=> {if(err)console.log(err); else console.log("Successful deletion"); });
		
			var Neworder=new order({userId:id,paymentId:paymentId,prods:global.prods,amount:amount,paymentMethod:paymentMethod});
			Neworder.save((err,order1)=>{if(err)console.log(err); else console.log(order1); res.send(order1.json()); });
		}
		
	});
});


app.get('/auth/linkedin',
  passport.authenticate('linkedin', { }));  

app.get('/auth/linkedin/callback', (req,res,next)=>{
  passport.authenticate('linkedin',(err)=>{ if(err)console.log(err); console.log(global.name); 
  res.redirect('/profile');   })(req,res,next); }  );
  
app.post('/localSignin',(req,res,next)=>{
	console.log(req.body);
	global.name=req.body.name; 
	 user.findOne({name:global.name})
    .then(function(user1) {
        return bcrypt.compare(req.body.pass,user1.pass);
    })
    .then(function(samePassword) {
        if(!samePassword)global.name=null; console.log('Signed In SuccessFully'); res.redirect('/profile');
     })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
}  );

app.post('/localSignup',(req,res,next)=>{
	console.log(req.body);   global.name=req.body.name; global.mail=req.body.email;  
	user.findOne({$or:[{name:req.body.name},{email:req.body.email}]},(err,user1)=>{
	   if(err)console.log(err); 
	   else if(user1){ console.log('Already A User'); 	res.redirect('/signup');  }
		else{
			    bcrypt.hash(req.body.pass,12).then(
				function(hashedPassword) {
							var Newuser=new user({name:req.body.name,email:req.body.email,pass:hashedPassword});
							Newuser.save((err,user1)=>{if(err)console.log(err); else console.log(user1.json()); });}).
				then(function() { res.redirect('/profile'); }).
				catch(  function(error){console.log("Error saving user: ");	console.log(error);next();   });
		}
	});

  }  );
  
  
app.get('/',(req,res)=>{res.end("Index");});

app.get('/profile',isSignedin,(req,res)=>{
 res.end("hey there");} );
function isSignedin(req,res,next)
{
	if(global.name)return next();
	res.redirect('/signin');
}
app.get('/logout',(req,res,next)=>{
	req.logout(); global.name=null;console.log('Signed Out SuccessFully');
	res.redirect('/');
});*/
}