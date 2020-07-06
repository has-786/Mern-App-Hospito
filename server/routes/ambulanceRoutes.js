module.exports=function(app){

ambulance=db.ambulance;
ride=db.ride;
 //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
		resamb=null; 
     
app.post('/getAmbulance',(req,res)=>{
	
	lat=req.body.lat;
	lng=req.body.lng;
	resd=999999999;
	
	ambulance.find({available:1},(err,ambulance1)=>{
		console.log(ambulance1.length);
		ambulance1.map((amb,ind)=>{
								console.log(lat+" "+lng+" "+amb.lat+" "+amb.lng);

					 if(amb.lat && amb.lng){
					d=calcCrow(lat,lng,amb.lat,amb.lng);				
					if(d<resd){ resd=d; global.resamb=amb; }
						console.log(resd);
			      }
		});
		if(global.resamb)res.send(global.resamb); 
		else res.send({});
		global.resamb=null;
		
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
						else {   console.log(ride1);	
								ambulance.updateOne({name:req.body.amb},{available:0},(err,ambulance1)=>{});
								res.send(ride1);  
							 }  
					});						
});


app.post('/updateLocation',(req,res)=>{
	var name=req.body.name;
	var lat=req.body.lat;  
	var lng=req.body.lng; 
	ambulance.findOne({name:name},(err,ambulance1)=>{
	if(err){console.log('Error'); return;}
	else {
			//console.log(ambulance1);    
			ambulance.updateOne({name:name},{lat:lat,lng:lng},(err,ambulance2)=>{
					if(err){console.log('Error'); return;} 
					else console.log(ambulance2); 	   
			});
		}
	});
	    
		ride.find({amb:name,$or:[{status:'Pending'},{status:'Ongoing'}]},(err,ride1)=>{if(err){console.log('Error'); return;} 
		else{ res.send(ride1); }   });   

});
	
app.post('/AcceptDriver',(req,res)=>{
	
	ride.updateOne({_id:req.body.id},{status:'Ongoing'},(err,ride1)=>{
		res.send(ride1);  
	});
});	
	
app.post('/removeAmbulance',(req,res)=>{
	
	
	ride.findOne({_id:req.body.id},(err,ride1)=>{
			if(err){console.log(err);}
			else if(ride1){
				   ride.updateOne({_id:ride1._id},{status:'Done'},(err,ride2)=>{
				   });
				   ambulance.updateOne({name:ride1.amb},{available:1},(err,ambulance1)=>{  });
				   			res.send(ride1);

			}	    

	});
});

app.post('/updateAmbulance',(req,res)=>{
	ride.findOne({_id:req.body.id},(err,ride1)=>{
	if(err){console.log('Error'); return;}
		else if(ride1){
							console.log(ride1);

			ambulance.findOne({name:ride1.amb},(err,amb1)=>{
						if(amb1){		console.log("dd"+amb1);

				   console.log("fafaf"+ride1);  
				   					res.send({status:ride1.status,lat:amb1.lat,lng:amb1.lng});	
						}
			});
		}

	});
});

app.post('/deleteAll',(req,res)=>{console.log("Deleted");ambulance.deleteMany({},(err,amb)=>{console.log('Deleted');}); });

}