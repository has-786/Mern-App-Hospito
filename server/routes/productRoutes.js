module.exports=function(app){
require('../security/passport.js')(passport);

db.con(mongoose);
product=db.product;
user=db.user;
order=db.order;
cart=db.cart;

prodObj=null;


  app.get('/showAllProds',(req,res)=>{
	product.find({},(err,prods)=>{
		if(err)console.log(err);
		else  res.send(prods);  
	});    
  });
  

app.post('/addProduct',(req,res)=>{
	
var name=req.body.name,price=req.body.price,disease=req.body.disease; 
var Newprod=new product({prodName:name,price:price,disease:disease});
Newprod.save((err,prod)=>{if(err)console.log(err); else {console.log(prod); res.send(prod);} });

});


app.post('/showCart',(req,res)=>{
	username=req.body.name;
	user.findOne({name:username},(err,user1)=>{
		if(err)console.log(err); 
	else if(!user1)console.log('Empty Cart');	
		else {id=user1._id; cart.findOne({userId:id},(err,cart1)=>{ if(err)console.log(err); else res.send(cart1); });   }
	}); 
});

app.post('/showProduct',(req,res)=>{
	var name=req.body.name;   console.log(req.body);
	product.find({$or:[ {prodName:{ $regex: name ,$options:'i'}},{disease:{ $regex:name,$options:'i' }} ]},(err,prod1)=>{ 
		if(err)console.log(err); 
		else if(!prod1){console.log("No such medicine");res.send({NotFound:'No such medicine'});}	
		else  {console.log(prod1);res.send(prod1);   }
	}); 
});


app.post('/addToCart',(req,res,next)=>{
  console.log('hi');

  username=req.body.name;
  prod=req.body.product;
  user.findOne({name:username},(err,user1)=>{
		if(err)console.log(err); 
		else if(user1)
		{
						id=user1._id; 
			cart.findOne({userId:id},(err,cart1)=>{ 
			if(err){console.log(err); }
			else if(!cart1)
			{			
		        product.findOne({prodName:prod},(err,prod1)=>{console.log(prod1);   

				console.log('Fresh cart');
				prodArr=[prod1];// prodArr.push(JSON.stringify(product));
				var Newcart=new cart({userId:id,prods:prodArr});
				Newcart.save((err,cart1)=>{if (err) res.send({msg:"Error Occured"}); else{console.log(cart1);res.send({msg:"Added to cart"});}  });
				});               
			} 
			else
			{	
				        product.findOne({prodName:prod},(err,prod1)=>{console.log(prod1);   

		                cart.updateOne({ userId: id},{ $push: {prods: prod1} },(err, cart1)=> 
						{ if (err) res.send({msg:"Error Occured"}); else{ console.log(cart1); res.send({msg:"Added to cart"}); }  });   });			

			}});
		}
		else console.log("User not available\n"); 

			
	});
});

app.post('/removeFromCart',(req,res,next)=>{
  username=req.body.name;
  prodName=req.body.prodName;
  user.findOne({name:username},(err,user1)=>{
		if(err)console.log(err); 
		else if(!user1)console.log("No such User");	
		else   
		{
					id=user1._id; 
			cart.findOne({userId:id},(err,cart1)=>{
			if(err)console.log(err); 
			else if(!cart1)  console.log("No such Cart\n");	
			else cart.update({ userId: id }, { $pull: { prods: {prodName:prodName} }}, { safe: true},(err, cart1)=> {
				
				if (err) res.send({msg:"Error Occured"}); console.log(cart1);res.send({msg:" removed from cart"});});
				
			});
			
		} 
	}); 
});

}