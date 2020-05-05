import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
let username=null;

class Showdoctor extends Component{
	constructor(props){
		super(props);
this.state={username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
 this.fun = this.fun.bind(this);	}
	
componentDidMount()
{
	this.state.username=localStorage.getItem('user');
	if(this.state.username)alert("Hi "+this.state.username);
	var data={name:null};
	fetch('/showAllDoctors',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
	
		
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
		fetch('/addAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
    (body)=>{alert(body.msg); if(body.msg=="Requested")document.getElementById(docname).innerHTML='Cancel Request'; }).catch(err=>console.log(err));
	}
	else 
	{
		var data={"name":this.state.username,"docname":docname,"email":email};      alert(JSON.stringify(data));
		fetch('/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
       (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='Request An Appointment'; }).catch(err=>console.log(err));
	}	
}

   fun1=(event)=>{
	    event.preventDefault();

		var data={"name":document.getElementById('1').value};      alert(JSON.stringify(data));
		fetch('/getDoctors',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{ if(!Array.isArray(body)){this.setState({obj:body});document.getElementById('show6').style.opacity=1;} 
     else{ this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show5').style.opacity=1;} }).catch(err=>console.log(err));
     
	 }
  
}



class Showappoint extends Component{
	constructor(props){
		super(props);
this.state={username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
	

	

componentDidMount()
{
	this.state.username=localStorage.getItem('user');
    if(this.state.username==null){alert('Please Login First'); }
	else {
	if(this.state.username)alert("Hi "+this.state.username);
		var data={name:this.state.username}; //this.setState({ position: 1 });
	fetch('/showAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{
  this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show3').style.opacity=1;} ).catch(err=>console.log(err));      
	}
}

render()
{
 return (
 <div>
  <center><h2 >MY APPOINTMENTS WITH DOCTORS</h2></center>   

  <div id='show3'><br></br><br></br>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 
	    <div class="col-lg-4">		

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4"><button class='btn btn-info'>Doctor</button></div><div class="col-lg-8"><button class='btn btn-warning'> {res.docname} </button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Status</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Time</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'__'} </button>	</div>
			</div>
			<br></br><br></br>
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12" style={{textAlign:'center'}}><button  class='btn btn-warning' id={res.docname} onClick={this.fun.bind(this,this.state.username,res.docname)} >Cancel Request</button><br></br></div>
			</div>	<br></br>
			</div>
		</div><br></br><br></br><br></br>
	
        </div>
))}
</div></div>
</section>
	</div> 
  
  
 </div>
 )
}
fun=(username,docname)=>{
	var data={"name":username,"docname":docname};     // alert(JSON.stringify(data));
		fetch('/removeAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(docname).innerHTML='____'; }).catch(err=>console.log(err));
}
}


class Updateappoint extends Component
{
	constructor(props){
		super(props);
this.state={username:null,arr:[{name:null,specialist:null,email:null}],obj:{name:null,specialist:null,email:null},msg:null,position:null}; 
	}
		componentDidMount(){
	this.state.username=localStorage.getItem('user');
	
	var data={docname:this.state.username}; //this.setState({ position: 1 });
	fetch('/showAppointToDoctor',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{
	 this.setState({arr:body});document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}


render()
{
 return (
 <div>
 <center><h2 >MY APPOINTMENTS WITH PATIENTS</h2></center>   
 
 
<div id='show3'><br></br><br></br>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 
	    <div class="col-lg-4">		

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4"><button class='btn btn-info'>Patient</button>	</div><div class="col-lg-8"><button class='btn btn-warning'> {res.name} </button></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-4"><button class='btn btn-info'>Status</button></div><div class="col-lg-8"><button class='btn btn-success'> {res.stat!=res.name+'stat'?res.stat:'___'} </button></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-4"><button class='btn btn-info'>Time</button></div> <div class="col-lg-8"><button class='btn btn-danger'> {res.timestamp!=res.name+'time'?res.timestamp:'__'} </button>	</div>
			</div>
			<br></br>
			
			<div class="features-icons-icon d-flex" >
<div class="col-lg-4"><button class='btn btn-info'>Activity</button></div>
<div class="col-lg-8"><select type='text' id={res.stat} ><option>Confirmed</option><option>Rejected</option></select></div>
			</div><br></br>
			 
			<div class="features-icons-icon d-flex" >
				<div class="col-lg-12"><button class='btn btn-primary'>Date & Time</button></div>
			</div><br></br>
			
			<div class="features-icons-icon d-flex" >
				<div class="col-lg-3"><button class='btn btn-secondary'>DD-MM-YY</button></div>
				<div class="col-lg-9">
				<select id={res.timestamp+'date'} ><option>01</option><option>02</option>
					<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
					<option>01</option><option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option>
					<option>01</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option>
					<option>21</option><option>22</option><option>23</option><option>24</option><option>24</option><option>25</option><option>26</option>
					<option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select>
				<select id={res.timestamp+'month'} ><option>01</option><option>01</option>
							<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
							<option>09</option><option>10</option><option>11</option><option>12</option></select>
				<select id={res.timestamp+'year'} ><option>2020</option><option>2021</option><option>2022</option></select>
				</div>    
			</div><br></br>
			
			
			<div class="features-icons-icon d-flex" >
							<div class="col-lg-3"><button class='btn btn-secondary'>H-M-S</button></div>
							<div class="col-lg-9">
				<select id={res.timestamp+'hour'} >
		<option>01</option><option>01</option> 
		<option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option>
		<option>09</option><option>10</option><option>11</option><option>12</option>
				</select>
							
		<select id={res.timestamp+'minute'} >
			<option>00</option><option>15</option><option>30</option><option>45</option>
		</select>
		
		<select id={res.timestamp+'second'} >
			<option>00</option><option>15</option>
			<option>30</option><option>45</option>
		</select>          
		<select id={res.timestamp+'ampm'} ><option>am</option><option>pm</option></select>
				</div>
			</div><br></br>
			
					

			
			
			
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12" style={{textAlign:'center'}}><button  class='btn btn-warning' id={res.name} onClick={this.fun.bind(this,username,res.name,res.stat,res.timestamp)} >Confirm</button><br></br></div>
				<br></br><br></br><br></br>
			</div>
	</div>
  </div><br></br><br></br><br></br>
</div>
))}
</div></div>
</section>
	</div> 
  
 
 
 
 
 

	</div>)
}
	fun=(username,name,stat,timestamp)=>{
	var data={"docname":this.state.username,"name":name,"stat":document.getElementById(stat).value,"timestamp":
	document.getElementById(timestamp+'date').value+'-'+document.getElementById(timestamp+'month').value+'-'+document.getElementById(timestamp+'year').value+
	' '+document.getElementById(timestamp+'hour').value+':'+document.getElementById(timestamp+'minute').value+':'+document.getElementById(timestamp+'second').value
	+' '+document.getElementById(timestamp+'ampm').value};
	alert(JSON.stringify(data));
		fetch('/updateAppoint',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); document.getElementById(name).innerHTML='Done'; }).catch(err=>console.log(err));
}
	
	
}






export  {Showdoctor,Showappoint,Updateappoint};





