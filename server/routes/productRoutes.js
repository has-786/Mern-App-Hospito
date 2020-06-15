module.exports=function(app){
require('../security/passport.js')(passport);

product=db.product;
user=db.user;
order=db.order;
cart=db.cart;

status=0;
prodObj=null;
prodReq=null;



app.post('/insertproduct',(req,res)=>{
	var name=req.body.name;
	var quantity=req.body.quantity;  
	var price=req.body.price;
	var disease=req.body.disease;
	
	var Newprod=new product({prodName:name,quantity:quantity,price:price,disease:disease});
					Newprod.save((err,prod1)=>{
						if(err)console.log(err);  
						else {   console.log(prod1);	res.send({msg:"Product Uploaded Successfully"});   } 
					});		
				
});



app.post('/deleteproduct',(req,res)=>{
	var id=req.body.id;

	product.findOneAndDelete({_id:id},(err,prod1)=>{
		if(err)console.log(err); 
		else if(!prod1)res.send({msg:"No such product"});	
		else   
		{
			res.send({msg:"Product Removed Successfully"});
		}
	});
				
});






app.post('/showAllProds',(req,res)=>{
	product.find({},(err,prods)=>{
		if(err)console.log(err);
		else  res.send(prods);  
	});    
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
  prodName=req.body.prodName;
  global.prodReq=req.body.prodName;
  console.log( global.prodReq); 
  global.status=0;
  user.findOne({name:username},(err,user1)=>{
		if(err)console.log(err); 
		else if(user1)
		{
						id=user1._id; 
			cart.findOne({userId:id},(err,cart1)=>{ 
			if(err){console.log(err); }
			else if(!cart1)
			{			
		        product.findOne({prodName:req.body.prodName,quantity:req.body.quantity},(err,prod1)=>{console.log(prod1);   

				console.log('Fresh cart');
				 
				 prodArr=[prod1]; 				 
				 var Newcart=new cart({userId:id,prods:prodArr});
				Newcart.save((err,cart1)=>{if (err) res.send({msg:"Error Occured"}); else{console.log(cart1);res.send({msg:"Added to cart"});}  });
				});               
			} 
			else
			{	
				        product.findOne({prodName:prodName,quantity:req.body.quantity},(err,prod1)=>{console.log(prod1);   
						
			            cart.findOne({ userId: id},(err,cart2)=>{
							   var Oldprod=cart1.prods; var prodName; 
							   for(var i=0;i<Oldprod.length;i++){console.log(Oldprod[i].prodName+" "+global.prodReq); if(Oldprod[i].prodName===global.prodReq)global.status=1;     }
							   console.log(global.status);
							   if(global.status==0){
		                cart.updateOne({ userId: id},{ $push: {prods:prod1} },(err, cart1)=> 
						{ if (err) res.send({msg:"Error Occured"}); else{ console.log(cart1); res.send({msg:"Added to cart"}); }  }); 
							   }
							 else res.send({msg:"Already Added"});
							 
						});			

						});
						
			}});
		}
		else console.log("User not available\n"); 

			
	});
});

app.post('/removeFromCart',(req,res,next)=>{
  username=req.body.name;
  prodName=req.body.prodName;
  quantity=req.body.quantity;
  user.findOne({name:username},(err,user1)=>{
		if(err)console.log(err); 
		else if(!user1)console.log("No such User");	
		else   
		{
					id=user1._id;  										
			cart.findOne({userId:id},(err,cart1)=>{
			if(err)console.log(err); 
			else if(!cart1)  console.log("No such Cart\n");	
			else cart.update({ userId: id }, { $pull: { prods: { prodName:prodName,quantity:quantity }}}, { safe: true},(err, cart1)=> {
				
				if (err) res.send({msg:"Error Occured"}); console.log(cart1);res.send({msg:" removed from cart"});});
				
			});
			
		} 
	}); 
});

}