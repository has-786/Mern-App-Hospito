module.exports=function(app){

blog=db.blog;


app.post('/insertblog',(req,res)=>{
	var data=req.body.data;
	var topic=req.body.topic;  
	var img=req.body.img;
	var timestamp=req.body.timestamp;
	
	var Newblog=new blog({img:img,topic:topic,data:data,timestamp:timestamp});
					Newblog.save((err,blog1)=>{
						if(err)console.log(err);  
						else {   console.log(blog1);	res.send({msg:"Blog Uploaded Successfully"});   } 
					});		
				
});
 
app.post('/showblog',(req,res)=>{

 blog.find({},(err,blog1)=>{if(err)console.log(err); else { console.log(blog1); res.send(blog1);}  });

});

app.post('/searchblog',(req,res)=>{
var name=req.body.name; 
 blog.find({$or:[ {topic:{$regex:name,$options:'i'}},{data:{$regex:name,$options:'i'}} ]},(err,blog1)=>{
			if(err)console.log(err);
			else {console.log(blog1);res.send(blog1);}
		 });
});





app.post('/deleteblog',(req,res)=>{
	var id=req.body.id; 
	blog.findOneAndDelete({_id:id},(err,blog1)=>{
		if(err)console.log(err); 
		else if(!blog1)res.send({msg:"No such Blog"});	
		else   
		{
			res.send({msg:"Blog Removed Successfully"});
		}
	});	
});







}