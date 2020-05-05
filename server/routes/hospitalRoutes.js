
module.exports=function(app){

hospital=db.hospital;

      app.post('/showAllHospitals',(req,res)=>{
	hospital.find({},(err,hospital1)=>{
		if(err)console.log(err);
		else  res.send(hospital1);  
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




app.post('/inserthospital',(req,res)=>{
	var name=req.body.name;
	var address=req.body.address;  
	var email=req.body.email;
	var phone=req.body.phone;
	
	var Newhospital=new hospital({name:name,address:address,email:email,phone:phone});
					Newhospital.save((err,hospital1)=>{
						if(err)console.log(err);  
						else {   console.log(hospital1);	res.send({msg:"Hospital Uploaded Successfully"});   } 
					});		
				
});
  
  

app.post('/deletehospital',(req,res)=>{
	var name=req.body.name;
	hospital.findOneAndDelete({name:name},(err,hospital1)=>{
		if(err)console.log(err); 
		else if(!hospital1)res.send({msg:"No such Hospital"});	
		else res.send({msg:"Hospital Removed Successfully"});
		
	});
});


  
  
}