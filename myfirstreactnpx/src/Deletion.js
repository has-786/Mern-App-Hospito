import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';



class DeleteBlog extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE BLOG</h2></center>

	<center>
	<span><br></br><br></br></span>
    
		<div><button class='btn btn-primary' >Blog ID</button><input type='text' id='id' name='id'   required/></div>
	<span><br></br><br></br></span>
	
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Delete</button>
	
	</center>
</div>);
}



fun2=(event)=>{
		
 var data={id:document.getElementById('id').value};
	fetch('http://localhost:8080/deleteblog',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  

}

}


class DeleteHospital extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE HOSPITAL</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'   required/></div>
	<span><br></br><br></br></span> 
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Delete</button>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
		
 var data={name:document.getElementById('name').value};
	fetch('http://localhost:8080/deletehospital',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  

}

}

class DeleteProduct extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE PRODUCT</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >ID</button><input type='text' id='id' name='name'   required/></div>
	<span><br></br><br></br></span> 

		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Delete</button>
	
	</center>
</div>);
}



fun2=()=>{
		
 var data={id:document.getElementById('id').value};
	fetch('http://localhost:8080/deleteproduct',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     

}
}



class Delete extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><a href='/DeleteBlog'><button class='btn btn-primary' >Delete Blogs</button></a></div>
	<span><br></br><br></br></span>
	<div><a href='/DeleteHospital'><button class='btn btn-danger' >Delete Hospitals</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/DeleteProduct'><button class='btn btn-success' >Delete Products</button></a></div>
		<span><br></br><br></br></span>
	</center>
</div>);
}

}


export {DeleteBlog,DeleteHospital,DeleteProduct,Delete};