import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';


class NewDriver extends Component{
	constructor(props){
		super(props); this.fun.bind(this); this.state={drivername:null};
	}
	
render()
{
 return (
 <div>
 <div id = "login-box">
 		<div class = "left-box" style={{display:'block'}}>
		 <br></br><br></br><br></br><br></br>

		<a href='/olddriver'><button class='btn btn-warning'>Already have an account</button></a><br></br><br></br>		
				<a href='/Ambulance'><button class='btn btn-success'>Go to Ambulance</button></a>	
		</div>
		<div class = "right-box">
			<center><h5><span class = "signin">Sign Up</span></h5></center>
				
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "text" name = "phone" id='2'  placeholder="phone" required/><br></br><br></br>
			<input type = "text" name = "car" id='5'  placeholder="car no." required/><br></br><br></br>
			<input type = "password" name = "pass" id='3'  placeholder="password" required/><br></br><br></br>
			<input type = "password" name = "password" id='4'  placeholder="Retypepassword" required/><br></br><br></br>
			<br></br>
			<button  name = "signup-button"  class='btn btn-primary' value = "sign up" onClick={this.fun.bind(this)}>Sign Up</button><br></br><br></br>
				

		</div>
	</div>
 </div>
 
)}

fun=(event)=>{
	event.preventDefault();
	if(document.getElementById('3').value!=document.getElementById('4').value){alert("Password Doesn't Match");return false;}
	if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0 || document.getElementById('3').value.length==0 
	|| document.getElementById('5').value.length==0){alert('Please Fill The Required Places'); return false;}
	var data={name:document.getElementById('1').value,phone:document.getElementById('2').value,pass:document.getElementById('3').value,car:
	document.getElementById('5').value  };
fetch('http://localhost:8080/driverSignup',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.drivername){this.state.drivername=body.drivername; alert(this.state.drivername); 
		
		var cookies={};
		cookies.drivername=this.state.drivername;
		
		  localStorage.setItem('cookies',JSON.stringify(cookies)); 
		}
		else alert('Username is already taken!! Please Try Another');
		}).catch(err=>console.log(err));
	}
}


class OldDriver extends Component{
	constructor(props){
		super(props); this.state={drivername:null};  
	}
	
	fun=(event)=>{
		event.preventDefault();
		//alert(username);
			if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0 ){alert('Please Fill Required Places'); return false;} 

		var data={name:document.getElementById('1').value,pass:document.getElementById('2').value };
		fetch('http://localhost:8080/driverSignin',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.drivername){this.state.drivername=body.drivername; alert(this.state.drivername); 
		var cookies={};
		if(localStorage.getItem('cookies')){var cookies=JSON.parse(localStorage.getItem('cookies')); }
		cookies.drivername=this.state.drivername;
		
		  localStorage.setItem('cookies',JSON.stringify(cookies)); 		}
		else alert('The username or password is incorrect!! Please Try Again');
		}).catch(err=>console.log(err));
	}
	
render()
{
 return (
 <div>
 <div id = "login-box">
		<div class = "right-box">
			<center><h5><span class = "signin">Sign In </span></h5></center>
				
	
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "password" name = "pass" id='2'  placeholder="password" required/>		

		<br></br><br></br>
			<button name = "signup-button" onClick={this.fun.bind(this)} class='btn btn-primary' value = "sign in">Sign In</button><br></br><br></br>
<br></br><br></br>

				<a href='/newdriver'><button class='btn btn-warning'>Don't have an account</button></a>
<br></br><br></br>

				<a href='/Ambulance'><button class='btn btn-success'>Go to Ambulance</button></a>	
		</div>
	</div>
 </div>)
 }

} 


class Ambulance extends Component{
	constructor(props){
		super(props);  this.state={status:'___',drivername:null,lat:null,lng:null,available:null,arr:[{user:'___',lat:null,lng:null,available:null,status:'___'}]};
	}
	
	
componentDidMount()
{
		
setTimeout(function(){  this.state.id=JSON.parse(localStorage.getItem('cookies')).id1;
		  this.state.drivername=JSON.parse(localStorage.getItem('cookies')).drivername; 		
if(!this.state.drivername){alert('Please Login First');	 document.getElementById('login').innerHTML="<a href='/olddriver'><button class='btn btn-danger' >Login</button></a>";}}.bind(this),500);
		

setInterval(function(){	
		
		    this.state.id=JSON.parse(localStorage.getItem('cookies')).id1;
		  this.state.drivername=JSON.parse(localStorage.getItem('cookies')).drivername; 		
		  if(!this.state.drivername){alert('Please Login First');	 document.getElementById('login').innerHTML="<a href='/oldriver'><button class='btn btn-danger' >Login</button></a>";}	
				
					if (navigator.geolocation) 
					{
							navigator.geolocation.getCurrentPosition((position)=>{
							this.setState({lat:position.coords.latitude});
							this.setState({lng:position.coords.longitude});
							});
					}
					else alert( "Geolocation is not supported by this browser.");
}.bind(this),3000);	

setInterval(function(){						//		alert(this.state.status); 
		  
							var data={name:this.state.drivername,lat:this.state.lat,lng:this.state.lng};    
							fetch('http://localhost:8080/updateLocation',{ method: 'POST', body:JSON.stringify(data),
							headers: {"Content-Type": "application/json" } }).then(response=>{
							return response.json()}).then((body)=>{if(body.length){this.setState({arr:body}); 
							//alert(this.state.status); 
							if(body[0].status==='Pending'){document.getElementById('Cancel').innerHTML='Accept';this.setState({status:'Pending'});
					     		  var cookies=JSON.parse(localStorage.getItem('cookies')); cookies.id1=body[0]._id; 
						    	  localStorage.setItem('cookies',JSON.stringify(cookies));
							}  
							else if(body[0].status==='Ongoing'){document.getElementById('Cancel').innerHTML='Cancel';this.setState({status:'Ongoing'});} 

							}
		          }).catch(err=>console.log(err)); 	  
		 
	}.bind(this),4000);  
	
				    setInterval(function(){	
												//alert(this.state.drivername); 
                        
							if(this.state.status!=='___')
							{						
								var data={id:this.state.id};  
								//alert(this.state.id);								
							fetch('http://localhost:8080/updateAmbulance',{ method: 'POST',body:JSON.stringify(data),
								headers: {"Content-Type": "application/json" } }).then(response=>{	return response.json()}).then((body)=>{ 
								this.setState({status:body.status});
                                    
								if(this.state.status==='Done'){ alert('The Trip is over');
								   document.getElementById('Cancel').innerHTML='Done';
											var cookies=JSON.parse(localStorage.getItem('cookies'));
										    cookies.id1=null;  
											localStorage.setItem('cookies',JSON.stringify(cookies));   
								   }   }).catch(err=>console.log(err)); 
							}					
						}.bind(this),5000);
			     

}

fun1=(event)=>{
event.preventDefault();

if(document.getElementById('Cancel').innerHTML==='Accept'){
   					var data={id:this.state.id};    

		fetch('http://localhost:8080/AcceptDriver',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body)=>{ alert('Accepted');
		this.state.status='Ongoing';  document.getElementById('Cancel').innerHTML='Cancel';
		}).catch(err=>console.log(err));    
		
	
}
 else if(document.getElementById('Cancel').innerHTML==='Cancel')
{
	
   					var data={id:this.state.id};     //alert(this.state.id);
fetch('http://localhost:8080/removeAmbulance',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body)=>{ alert('Cancelled'); 
		this.setState({status:'Done'});    
		document.getElementById('Cancel').innerHTML='Done';
		}).catch(err=>console.log(err));    
		
}
	

}
	
signout=()=>{
	
	//localStorage.removeItem('driver');
	var cookies=JSON.parse(localStorage.getItem('cookies'));
	 cookies.drivername=null;
	 document.getElementById('login').innerHTML="<a href='/oldriver'><button class='btn btn-danger' >Login</button></a>";
	 localStorage.setItem('cookies',JSON.stringify(cookies));  
	alert('Successfully Signed Out');
}	
	

render()
{
 return (
 <div>
<center><h2 >AMBULANCE SERVICE</h2></center>	
<div id='login' style={{float:'right',marginRight:'0px'}}><button class='btn btn-danger' onClick={this.signout.bind(this)} >Logout</button></div>

  <section>
  <div class="row" >
	<div class="col-lg-12"  >		<br></br><br></br>

		<div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{border:"5px solid red",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

			<div class="features-icons-icon d-flex">
						
<div class="col-lg-3"><button class='btn btn-secondary'>Ride ID</button></div><div class="col-lg-9"><center><button class='btn btn-success'>{this.state.arr[0]._id}</button></center></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Contact</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {this.state.arr[0].user}</button></center></div>
			</div><br></br><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Status</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {this.state.status} </button></center></div>
			</div><br></br><br></br>
<div class="features-icons-icon d-flex">
		 <div class="col-lg-12">	<button  class='btn btn-warning' id='Cancel' onClick={this.fun1.bind(this)} style={{marginRight:"15px"}}>___</button></div>
		 <br></br><br></br><br></br>
			</div>	
			</div>
		</div><br></br><br></br><br></br>
	
        </div>	
		</div></section>  
</div>);
}

}


export  {Ambulance,NewDriver,OldDriver};

