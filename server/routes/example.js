var express=require('express');
path=require('path');
app=express();
var mongoose=require('mongoose');
passport=require('passport');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
require('../security/passport.js')(passport);

db.con(mongoose);
product=db.product;
user=db.user;
order=db.order;
cart=db.cart;
prods=null;
app.get('/pay',(req,res)=>{  res.sendFile(path.join(__dirname+'/pay.html'));  });

app.post('/CompletePaidOrder',(req,res)=>{
	var paymentId=req.body.paymentId;
	var username=req.body.username;
	var amount=req.body.amount;
	var paymentMethod="Done";
	var address=req.body.address;
	user.findOne({name:username},(err,user1)=>{
		if(err){console.log(err); }
		else if(!user1){console.log('user not available');}
		else if(user1){
			id=user1._id;
			cart.findOneAndDelete({ userId:id }).then((cart1)=>{
			}).catch((err)=> {if(err)console.log(err); else if(cart1==null)console.log('cart is empty'); else {global.prods=cart1.prods;console.log("Successful deletion");} });
		
			var Neworder=new order({userId:id,paymentId:paymentId,address:address,prods:global.prods,amount:amount,paymentMethod:paymentMethod});
			Neworder.save((err,order1)=>{if(err)console.log(err); else console.log(order1); res.send(order1); });
		}
	});
});
 
app.post('/CompleteCashOrder',(req,res)=>{
	var paymentId=null;
	var username=req.body.username;
	var amount=req.body.amount;
	var paymentMethod="Cash";
	var address=req.body.address;
	user.findOne({name:username},(err,user1)=>{
		if(err){console.log(err); }
		else if(!user1){console.log('user not available');}
		else if(user1){
			id=user1._id;
			cart.findOneAndDelete({ userId:id }).then((cart1)=>{
			}).catch((err)=> {if(err)console.log(err); else if(!cart1)res.send('cart is empty');  else{		global.prods=cart1.prods;
			console.log("Successful deletion");} });
		
			var Neworder=new order({userId:id,paymentId:paymentId,address:address,prods:global.prods,amount:amount,paymentMethod:paymentMethod});
			Neworder.save((err,order1)=>{if(err)console.log(err); else console.log(order1); res.send(order1); });
		}
	});
});
	
app.listen(8080,()=>{console.log('listening');});
