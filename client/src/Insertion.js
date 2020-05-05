import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';



class InsertBlog extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD BLOG</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Image Link</button><input type='text' id='img' name='img'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Mention Topic</button><input type='text' id='topic' name='topic'   required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Write Here</button><input type='text' id='data' name='data'   required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
		if(!this.state.username){alert('Please Login First');return false;}

	var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  const currDate = date;
 var data={img:document.getElementById('img').value,topic:document.getElementById('topic').value,data:document.getElementById('data').value,
 timestamp:currDate};
	fetch('/insertblog',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  }

}



class InsertHospital extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD HOSPITAL</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Address</button><input type='text' id='address' name='address'   required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Email</button><input type='text' id='email' name='email'   required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Phone</button><input type='text' id='phone' name='phone'   required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
		//if(!this.state.username){alert('Please Login First');return false;}
		
 var data={name:document.getElementById('name').value,address:document.getElementById('address').value,email:document.getElementById('email').value,
 phone:document.getElementById('phone').value};
	fetch('/inserthospital',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  }

}



class InsertProduct extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD PRODUCT</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'  required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Quantity</button><input type='text' id='quantity' name='quantity'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger'>Price</button><input type='text' id='price' name='price'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Disease</button><input type='text' id='disease' name='disease'  required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
	
 var data={name:document.getElementById('name').value,quantity:document.getElementById('quantity').value,price:document.getElementById('price').value,
 disease:document.getElementById('disease').value};
	fetch('/insertproduct',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  }

}





class InsertVideo extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD VIDEO</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'  required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Tags</button><input type='text' id='tags' name='tags'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger'>Link</button><input type='text' id='link1' name='link'  required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
// https://youtu.be/FJLdGDoP300
var t="https://www.youtube.com/embed/"
var link1=document.getElementById('link1').value;
t+=link1.substr(17,link1.length-17);
	
	
 var data={name:document.getElementById('name').value,tags:document.getElementById('tags').value,link1:t};
	fetch('http://localhost:8080/insertVideo',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  }

}






class Insert extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><a href='/InsertBlog'><button class='btn btn-primary' >Upload Blogs</button></a></div>
	<span><br></br><br></br></span>
	<div><a href='/InsertHospital'><button class='btn btn-danger' >Upload Hospitals</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/InsertProduct'><button class='btn btn-success' >Upload Products</button></a></div>
		<span><br></br><br></br></span>
		<div><a href='/InsertVideo'><button class='btn btn-warning' >Upload Videos</button></a></div>
		<span><br></br><br></br></span>
	</center>
</div>);
}
}


export {InsertBlog,InsertHospital,InsertProduct,InsertVideo,Insert};