module.exports=function(app)
{
require('../security/passport.js')(passport);

//db.con(mongoose);
product=db.product;
user=db.user;
order=db.order;
cart=db.cart;

var msg='Error!!!Try Again';
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
  
app.post('/CompletePaidOrder',(req,res)=>{
	var paymentId=req.body.paymentId;
	var username=req.body.username;
	var amount=req.body.amount/1000;
	var timestamp=req.body.timestamp;
	var paymentMethod="Done";
	var address=req.body.address;
	user.findOne({name:username},(err,user1)=>{
		if(err){console.log(err); }
		else if(!user1){console.log('user not available');}
		else if(user1){
			id=user1._id;
			cart.findOneAndDelete({ userId:id }).then((cart1)=>{
var Neworder=new order({userId:id,paymentId:paymentId,address:address,prods:cart1.prods,amount:amount,paymentMethod:paymentMethod,timestamp:timestamp});
			Neworder.save((err,order1)=>{if(err)console.log(err); else console.log(order1); });			}).catch((err)=> {if(err)console.log(err); else console.log("Successful deletion of Cart"); });
		
		}
	});
});
 
app.post('/CompleteCashOrder',(req,res)=>{
	var paymentId=null;
	var username=req.body.username;
	var amount=req.body.amount;
	var timestamp=req.body.timestamp;
	var paymentMethod="Cash";
	var address=req.body.address;
	user.findOne({name:username},(err,user1)=>{
		if(err){console.log(err); }
		else if(!user1){console.log('user not available');}
		else if(user1){
			id=user1._id;
			cart.findOneAndDelete({ userId:id }).then((cart1)=>{console.log(cart1/prods);
	var Neworder=new order({userId:id,paymentId:paymentId,address:address,prods:cart1.prods,amount:amount,paymentMethod:paymentMethod,timestamp:timestamp});
			Neworder.save((err,order1)=>{if(err)console.log(err); else {console.log(order1);  global.msg="Order Was Successful";  				res.send({msg:global.msg});
 }  });
			}).catch((err)=> {if(err)console.log(err); else console.log("Successful deletion"); });

		}
	});
});

app.post('/showOrder',(req,res)=>{
user.findOne({name:req.body.name},(err,user1)=>{
if(err)console.log(err);
else if(!user1){}
else 
{
 var id=user1._id;
 order.find({userId:id},(err,order1)=>{if(err)console.log(err); else {console.log(order1);res.send(order1);}  });
}

});



});








	


}

