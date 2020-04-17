
module.exports=function(app){

hospital=db.hospital;

      app.get('/showAllHospitals',(req,res)=>{
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




  
  
  
  
}