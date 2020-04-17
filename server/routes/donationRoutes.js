module.exports=function(app){

donation=db.donation;
user=db.user;

app.post('/donation',(req,res)=>{
	var username=req.body.username;
		var paymentId=req.body.paymentId;
		var cause=req.body.cause;  
	var amount=req.body.amount;
	var timestamp=req.body.timestamp;
	
	user.findOne({name:username},(err,user1)=>{
				if(err)console.log(err);	
				else if(!user1){  console.log("User not found"); res.send({msg:"Please login first"});   }  
				else 
				{
					var id=user1._id;
					var Newdonation=new donation({userId:id,paymentId:paymentId,cause:cause,amount:amount,timestamp:timestamp});
					Newdonation.save((err,donation1)=>{if(err)console.log(err); else {   console.log(donation1);
												res.send({msg:"Donation for "+donation1.cause+" of "+donation1.amount+" is successful"}); }  });		
				}
	});
});
 
app.post('/showDonation',(req,res)=>{
user.findOne({name:req.body.name},(err,user1)=>{
if(err)console.log(err);
else if(!user1){console.log('user not found');}
else 
{
 var id=user1._id;  
 donation.find({userId:id},(err,donation1)=>{if(err)console.log(err); else { console.log(donation1); res.send(donation1);}  });
}

});

});
}