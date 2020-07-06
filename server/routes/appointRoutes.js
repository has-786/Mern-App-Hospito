module.exports=function(app,nodemailer)
{
	
	appoint=db.appoint;
	user=db.user;

	msg=null;
app.post('/showAllDoctors',(req,res)=>{
	user.find({type:'Doctor'},(err,doctors)=>{
		if(err)console.log(err);
		else  res.send(doctors);  
	});  
  });
  	
	

app.post('/getDoctors',(req,res)=>{
	var name=req.body.name;
		 user.find({type:'Doctor',$or:[ {name:{$regex:name,$options:'i'}},{specialist:{$regex:name,$options:'i'}} ]},(err,doctor)=>{
			if(err)console.log(err);
			else {console.log(doctor);res.send(doctor);}
		 });
});
	
	
	
	

app.post('/addAppoint',(req,res)=>{

console.log(req.body.email);
	  appoint.findOne({name:req.body.name,docname:req.body.docname},(err,appoint1)=>{
	  console.log(appoint1); 
	  if(appoint1){global.msg='Multiple Appointment With Same Doctor is Not Allowed'; 		        res.send({msg:global.msg});}
	  else 
	  {
		  var Newappoint=new appoint({name:req.body.name,docname:req.body.docname,stat:req.body.name+'stat',timestamp:req.body.name+'time'});
		Newappoint.save((err,appoint1)=>{
			if (err) res.send({msg:"Error Occured"}); 
			else
			{
				global.msg="Requested";
				var transporter = nodemailer.createTransport({    host: 'smtp.gmail.com',
                port: 465,
                secure: true,auth: {user:'syedhasnain9163@gmail.com', pass:'***' }});
				const mailOptions = {from: 'syedhasnain9163@gmail.com', to: req.body.email, subject: 'Appointment Request', text:'Appointment Request....Please Check Hospito'};
				transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});    
				console.log(appoint1); 	
		        res.send({msg:global.msg});
				
			}
		  });
		}

	});
				//console.log(global.msg);

		
		
});
app.post('/removeAppoint',(req,res)=>{
		appoint.findOneAndDelete({ name:req.body.name,docname:req.body.docname }).then((appoint1)=>{
			
   var  transporter = nodemailer.createTransport({    host: 'smtp.gmail.com',
                port: 465,
                secure: true,auth: {user:'syedhasnain9163@gmail.com', pass:'******'  //put your password
									}});
   const mailOptions = {from: 'syedjah1970@gmail.com', to: req.body.email,subject: 'One request cancelled', text:'Appointment Request Cancelled....Please Check Hospito'};
   transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});	
			
			
		console.log('Cancelled');res.send({msg:'Cancelled'});}).catch((err)=> {if(err)console.log(err);  });
});
  app.post('/showAppoint',(req,res)=>{

		 appoint.find({name:req.body.name},(err,appoint1)=>{
			if(err)console.log(err);
			else {	console.log(appoint1);res.send(appoint1);	}
		 });
});
app.post('/showAppointToDoctor',(req,res)=>{
	//if(!global.name){res.redirect('http://localhost:3000/signin');return;}

		 appoint.find({docname:req.body.docname},(err,appoint1)=>{
			if(err)console.log(err);
			else {console.log(appoint1);res.send(appoint1);}
		 });
});  

  app.post('/updateAppoint',(req,res)=>{
		 appoint.updateOne({name:req.body.name,docname:req.body.docname},{stat:req.body.stat,timestamp:req.body.timestamp},(err,appoint1)=>{
			if(err)console.log(err); 
			else {console.log(appoint1); 
					user.findOne({name:req.body.name},(err,user1)=>{
						if(err)console.log(err);
						else {
							var  transporter = nodemailer.createTransport({    host: 'smtp.gmail.com',
                port: 465,
                secure: true,auth: {user:'syedhasnain9163@gmail.com', pass:'****' //put your password
							}}); 
				if(req.body.stat==='Confirmed'){ var txt='The Appoinment is confirmed.Visit this link on '+req.body.timestamp+'\n'+'https://whereby.com/sdroom';  }
				else {  var txt='The Appoinment Request is rejected';  }
						
	user.findOne({name:req.body.docname},(err,doc1)=>{
		
		const mailOptions = {from: 'syedjah1970@gmail.com', to:[user1.email,doc1.email], subject: 'Appointment at Hospito', text:txt};
   transporter.sendMail(mailOptions, function (err, info) { if(err) console.log(err);else {  console.log(info);  }});
			
	});					
			}
					});
			res.send({msg:req.body.stat});}
		 });
}); 
	

	
}