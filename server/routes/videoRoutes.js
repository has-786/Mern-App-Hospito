
module.exports=function(app){

video=db.video;

   app.get('/showAllVideos',(req,res)=>{
	 video.find({},(err,video1)=>{
		if(err)console.log(err);
		else  res.send(video1);  
	});  
  });
  
  
 
app.post('/showVideo',(req,res)=>{
var name=req.body.name; 
 video.find({$or:[ {name:{$regex:name,$options:'i'}},{tags:{$regex:name,$options:'i'}} ]},(err,video1)=>{
			if(err)console.log(err);
			else {console.log(video1);res.send(video1);}
		 });
});




app.post('/insertVideo',(req,res)=>{
	var name=req.body.name;
	var tags=req.body.tags;  
	var link1=req.body.link1;
	var likes=0;
	
	var NewVideo=new video({name:name,tags:tags,link1:link1,likes:likes});
					NewVideo.save((err,video1)=>{
						if(err)console.log(err);  
						else {   console.log(video1);	res.send({msg:"Video Uploaded Successfully"});   } 
					});		
				
});
  
  

app.post('/deleteVideo',(req,res)=>{
	var id=req.body.id;
	video.findOneAndDelete({_id:id},(err,video1)=>{
		if(err)console.log(err); 
		else if(!video1)res.send({msg:"No such Video"});	
		else res.send({msg:"Video Removed Successfully"});
		
	});
});



app.post('/like',(req,res)=>{
	var id=req.body.id;
	video.updateOne({_id:id},{$inc: {'likes': 1 }},(err,video1)=>{
		if(err)res.send({msg:"Something Went Wrong"});
		else if(!video1)res.send({msg:"Something Went Wrong"});	
		else res.send({msg:"Video Was Liked"});
		
	});
});


  
  
}