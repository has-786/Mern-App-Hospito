import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;

class Showdoctor extends Component{
	constructor(props){
		super(props);
this.state={path:"http://localhost:5000",username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
 this.fun = this.fun.bind(this);	}
	
componentDidMount()
{
	this.state.username=localStorage.getItem('user');
	if(this.state.username)alert("Hi "+this.state.username);
	var data={name:null};
	fetch(this.state.path+'/showAllDoctors',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
		
}

render()
{
 return (
 <div style={{width:"100%"}}>
 <center><h2 style={{width:"100%"}}>FIND DOCTORS<a href='/'><button class='btn-sm btn btn-primary'  style={{float:"right",marginRight:"0%"}}>Home</button></a></h2></center> 
 <div class='row'>

 <div class='col-lg-6'>
   
		<form onSubmit={this.fun1}><button class='btn btn-sm btn-primary'>Search Doctors </button>	
				<input type='text' id='1' name='name'  required/>
				<input type='submit'  value='Search'  />    </form>
			</div>
 <div class='col-lg-6'>
	<a href='/Showappoint'><button  id='showcart' class='btn btn-sm btn-success' >Show Appointments</button></a>
 </div>
</div>
	<br></br><br></br>
	<div id='show1'><br></br><br></br>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 
	    <div class="col-lg-4">		

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{padding:"20px",backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
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
		 <div class="col-lg-12" style={{textAlign:'center'}}>	<button  class='btn btn-warning' id={res.name} onClick={this.fun.bind(this,this.state.username,res.name,res.email)} >Request An Appointment</button></div>
			</div>	<br></br>
			</div>
		</div><br></br><br></br><br></br>
	
        </div>
))}
</div></div>
</section>
	</div> 
	
</div>
  )}
  fun=(username,docname,email)=>{
if(username===null){ alert('Please Login First'); return false;}
	if( document.getElementById(docname).innerHTML==='Request An Appointment') 
	{		
	var data={"name":this.state.username,"docname":docname,"email":email};      alert(JSON.stringify(data));
		fetch(this.state.path+'/addAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
    (body)=>{alert(body.msg); if(body.msg=="Requested")document.getElementById(docname).innerHTML='Cancel Request'; }).catch(err=>console.log(err));
	}
	else 
	{
		var data={"name":this.state.username,"docname":docname,"email":email};      alert(JSON.stringify(data));
		fetch(this.state.path+'/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
       (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='Request An Appointment'; }).catch(err=>console.log(err));
	}	
}

   fun1=(event)=>{
	    event.preventDefault();

		var data={"name":document.getElementById('1').value};      alert(JSON.stringify(data));
		fetch(this.state.path+'/getDoctors',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{ if(!Array.isArray(body)){this.setState({obj:body});document.getElementById('show6').style.opacity=1;} 
     else{ this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show5').style.opacity=1;} }).catch(err=>console.log(err));
     
	 }
  
}



const mapStateToProps = (state) => {
  return {
      prod:state.prod
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAllProds: (arr) => {
            dispatch({
                type: "SHOW_ALL_PROD",
                payload: arr
            });
        },
		searchProds: (arr) => {
            dispatch({
                type: "SEARCH_PROD",
                payload: arr
            });
        }
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default connect(mapStateToProps, mapDispatchToProps)(Showdoctor);
//export Showcart;



//export default Home;





