import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
let username=null;

class Showdoctor extends Component{
	constructor(props){
		super(props);
this.state={arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
 this.fun = this.fun.bind(this);	}
	
componentDidMount()
{
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username; }  ).catch(err=>console.log(JSON.stringify(err)));
	
	
setTimeout(function(){	
	fetch('http://localhost:8080/showAllDoctors',{ method: 'GET', 
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
}.bind(this),1000);		
		
}

render()
{
 return (
 <div>
 <center><h2 >FIND DOCTORS</h2></center> 
	<a href='/showappoint'><button  id='showcart' class='btn btn-success' >Show Appointments</button></a>
 
    <form onSubmit={this.fun1}>
			<div class="row">
				<div class="col-lg-4"><button class='btn btn-primary'>Search for Doctors </button>	
				<input type='text' id='1' name='name'  required/>
				<input type='submit'  value='Search'  />
				</div>
			</div>
    </form>
	<br></br><br></br>
	<div id='show1'><br></br><br></br>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 
	    <div class="col-lg-4">		

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4">	<button class='btn btn-info'>Name</button></div><div class="col-lg-8"><button class='btn btn-primary'>{res.name}</button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Specialist</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.specialist} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Email</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.email} </button></div>
			</div>
			<br></br><br></br>
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12" style={{textAlign:'center'}}>	<button  class='btn btn-warning' id={res.name} onClick={this.fun.bind(this,username,res.name,res.email)} >Request An Appointment</button></div>
			</div>	<br></br>
			</div>
		</div><br></br><br></br><br></br>
	
        </div>
))}
</div></div>
</section>
	</div> 
		
	<div id='show6'>
		<button class='btn btn-info'>Name</button><button class='btn btn-primary'> {this.state.obj.name} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Specialist</button><button class='btn btn-success'> {this.state.obj.specialist} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Email</button><button class='btn btn-danger'> {this.state.obj.email} </button> 
		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={this.state.obj.name} onClick={this.fun.bind(this,username,this.state.obj.name)} >Request An Appointment</button>
	</div>
	
</div>
  )}
  fun=(username,docname,email)=>{
	if( document.getElementById(docname).innerHTML==='Request An Appointment') 
	{		
	var data={"name":username,"docname":docname,"email":email};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/addAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
    (body)=>{alert(body.msg); if(body.msg=="Requested")document.getElementById(docname).innerHTML='Cancel Request'; }).catch(err=>console.log(err));
	}
	else 
	{
		var data={"name":username,"docname":docname,"email":email};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
       (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='Request An Appointment'; }).catch(err=>console.log(err));
	}	
}

   fun1=(event)=>{
	    event.preventDefault();
		var data={"name":document.getElementById('1').value};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/getDoctors',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{ if(!Array.isArray(body)){this.setState({obj:body});document.getElementById('show6').style.opacity=1;} 
     else{ this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show5').style.opacity=1;} }).catch(err=>console.log(err));
     
	 }
  
}



class Showappoint extends Component{
	constructor(props){
		super(props);
this.state={arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
	

	

componentDidMount()
{
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username; alert(username); }  ).catch(err=>console.log(JSON.stringify(err)));
	
	setTimeout(function(){	
	var data={name:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{if(!Array.isArray(body)){this.setState({obj:body}); document.getElementById('show4').style.opacity=1;	} 
 else{ this.setState({arr:body}); if(!body.length)alert('No result found'); document.getElementById('show3').style.opacity=1;} }).catch(err=>console.log(err));}.bind(this),1000);      

}

render()
{
 return (
 <div>
  <center><h2 >MY APPOINTMENTS WITH DOCTORS</h2></center>   

 <div id='show3'><br></br><br></br><br></br>
		{this.state.arr.map( res=>( <div>
	<button class='btn btn-info'>Doctor</button>	<button class='btn btn-warning'> {res.docname} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Status</button><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Time</button><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'__'} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={res.docname} onClick={this.fun.bind(this,username,res.docname)} >Cancel Request</button><br></br>
			<br></br><br></br><br></br><br></br>
		</div>))}
	</div> 
		
	<div id='show4'>
		<button class='btn btn-info'>Doctor</button><button class='btn btn-success'>{this.state.obj.docname} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Status</button><button class='btn btn-danger'> {this.state.obj.stat==null?this.state.obj.stat:'_'} </button> 
		&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Time</button>
	<button class='btn btn-danger'> {this.state.obj.time==null?this.state.obj.time:'_'} </button>		&nbsp;&nbsp;&nbsp;&nbsp;

			<button  class='btn btn-warning' id={this.state.obj.docname} onClick={this.fun.bind(this,username,this.state.obj.docname)} >

			Cancel Request</button>
	</div>
 </div>
 )
}
fun=(username,docname)=>{
	var data={"name":username,"docname":docname};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='Request An Appointment'; }).catch(err=>console.log(err));
}
}


class Updateappoint extends Component
{
	constructor(props){
		super(props);
this.state={arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
		componentDidMount(){
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username; alert(username); }  ).catch(err=>alert(JSON.stringify(err)));
	  
		
setTimeout(function(){	
	var data={docname:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showAppointToDoctor',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{
	 this.setState({arr:body});document.getElementById('show7').style.opacity=1;}).catch(err=>console.log(err));	
}.bind(this),1000);
}


render()
{
 return (
 <div>
 <center><h2 >MY APPOINTMENTS WITH PATIENTS</h2></center>   
 
 <div id='show7'>
 <br></br><br></br><br></br>
		{this.state.arr.map( res=>( <div>
	<button class='btn btn-info'>Patient</button>	<button class='btn btn-warning'> {res.name} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Status</button><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Time</button><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'___'} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
		<button>Status</button><input type='text' id={res.stat} required/><button>Time</button><input type='text' id={res.timestamp} required/> 
			
			<button  class='btn btn-warning' id={res.name} onClick={this.fun.bind(this,username,res.name,res.stat,res.timestamp)} >Confirm</button><span><br></br></span>
			<br></br><br></br><br></br><br></br><br></br><br></br>
		</div>))}
	</div> 
	</div>)
}
	fun=(username,name,stat,timestamp)=>{
	var data={"docname":username,"name":name,"stat":document.getElementById(stat).value,"timestamp":document.getElementById(timestamp).value};
	alert(JSON.stringify(data));
		fetch('http://localhost:8080/updateAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(name).innerHTML='Done'; }).catch(err=>console.log(err));
}
	
	
}







class  Hospital extends Component{
constructor(props){ super(props);  this.state={arr:[{name:null,address:null,email:null,phone:null}],msg:null};
this.fun.bind(this); 
}
componentDidMount()
{ 
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ username=body.username;alert("user: "+username);}).catch(err=>console.log(err));
		
	
    setTimeout(function(){	
	fetch('http://localhost:8080/showAllHospitals',{ method: 'GET',
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
}.bind(this),1000);		
			
}	
render()
{
	
 return (
 <div>
 <center><h2 >FIND HOSPITALS</h2></center>   
   			<form onSubmit={this.fun}>

			<button class='btn btn-primary'>Search Hospitals</button>&nbsp;&nbsp;&nbsp;&nbsp;	
			<input type='text'  name='name'  id='1' required/>
				<input type='submit'  value='Search' />
           </form>			
<br></br><br></br><br></br><br></br>
	<div id='show1'>		

		{this.state.arr.map( res=>( <div class="col-lg-4">		<br></br><br></br>

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4">	<button class='btn btn-info'>Name</button></div><div class="col-lg-8"><button class='btn btn-primary'>{res.name}</button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Address</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.address} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Email</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.email} </button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Phone</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.phone} </button></div>
			</div>
		</div>	
		<br></br><br></br><br></br>
	
        </div></div>))}
	</div> 
	
</div>
  )
}


 fun=(event)=>{
	    event.preventDefault();
		var data={"name":document.getElementById('1').value};     
		fetch('http://localhost:8080/showHospital',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{  this.setState({arr:body}); if(!body.length)alert('No result found'); document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));
 
    }

	




}




export  {Showdoctor,Showappoint,Updateappoint,Hospital};





