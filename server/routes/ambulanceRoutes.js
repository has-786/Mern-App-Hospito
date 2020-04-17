module.exports=function(app){

ambulance=db.ambulance;
ride=db.ride;

app.get('/getAmbulance',(req,res)=>{
	
	ambulance.find({available:1},(err,ambulance1)=>{
		res.send(ambulance1);
	});
	
});

app.post('/showAmbulance',(req,res)=>{
	
	ride.findOne({user:req.body.user,$or:[{status:'Pending'},{status:'Ongoing'}]},(err,ride1)=>{
			if(ride1){			
			console.log("ye hai ride"); 	console.log(ride1);
			ambulance.findOne({name:ride1.amb},(err,ambulance1)=>{
                 console.log("ye hai ambulance");                   console.log(ambulance1);              
			    res.send({ambu:ambulance1,status:ride1.status });
				});
			}
				else res.send(null);
					

	});
	
	
});


app.post('/addAmbulance',(req,res)=>{
	var Newride=new ride({user:req.body.user,amb:req.body.amb,status:req.body.status,timestamp:req.body.timestamp});
	Newride.save((err,ride1)=>{
						if(err)console.log(err);  
						else {   console.log(ride1);		ambulance.updateOne({name:req.body.amb},{available:0},(err,ambulance1)=>{});
							res.send(ride1);   } 
					});						
});


app.post('/updateLocation',(req,res)=>{
	var name=req.body.name;
	var lat=req.body.lat;  
	var lng=req.body.lng; 
	ambulance.findOne({name:name},(err,ambulance1)=>{
	if(err){console.log('Error'); return;}
	else {
			console.log(ambulance1);    
			ambulance.updateOne({name:name},{lat:lat,lng:lng},(err,ambulance2)=>{
					if(err){console.log('Error'); return;} 
					else console.log(ambulance2); 	   
			});
		}
	});
	    
		ride.find({amb:name,$or:[{status:'Pending'},{status:'Ongoing'}]},(err,ride1)=>{if(err){console.log('Error'); return;} 
		else{console.log(ride1);		res.send(ride1); }   });

});
	
app.post('/AcceptDriver',(req,res)=>{
	
	ride.updateOne({_id:req.body.id},{status:'Ongoing'},(err,ride1)=>{
		res.send(ride1);  
	});
});	
	



app.post('/removeAmbulance',(req,res)=>{
	
	
	ride.findOne({_id:req.body.id},(err,ride1)=>{
			if(err){console.log(err);}
			else{
				   ride.updateOne({_id:ride1._id},{status:'Done'},(err,ride2)=>{
				   });
				   ambulance.updateOne({name:ride1.amb},{available:1},(err,ambulance1)=>{  });
			}	    
			res.send(ride1);

	});
});

app.post('/updateAmbulance',(req,res)=>{
	ride.findOne({_id:req.body.id},(err,ride1)=>{
	if(err){console.log('Error'); return;}
		else{
			console.log(ride1);  
			res.send(ride1);	
		}
	});
});


}