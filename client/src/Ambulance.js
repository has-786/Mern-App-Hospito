import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;


class Ambulance extends Component{
	constructor(props){
		super(props);  this.state={path:"http://localhost:5000",status:'___',drivername:null,lat:null,lng:null,available:null,arr:[{user:'___',lat:null,lng:null,available:null,status:'___'}]};
	}
	
	
componentDidMount()
{
		
setTimeout(function(){ 
 
  if(JSON.parse(localStorage.getItem('cookies'))){this.state.id=JSON.parse(localStorage.getItem('cookies')).id1;
  this.state.drivername=JSON.parse(localStorage.getItem('cookies')).drivername; 	}	
if(!this.state.drivername){alert('Please Login First');	 document.getElementById('login').innerHTML="<a href='/olddriver'><button class='btn btn-danger' >Login</button></a>";}}.bind(this),500);
		

setInterval(function(){	
		
		  if(!this.state.drivername){alert('Please Login First');	 document.getElementById('login').innerHTML="<a href='/olddriver'><button class='btn btn-danger' >Login</button></a>";}	
				
					if (navigator.geolocation) 
					{
							navigator.geolocation.getCurrentPosition((position)=>{
							this.setState({lat:position.coords.latitude});
							this.setState({lng:position.coords.longitude});
							});
					}
					else alert( "Geolocation is not supported by this browser.");
}.bind(this),1000);	

setInterval(function(){						//		alert(this.state.status); 
		  
							var data={name:this.state.drivername,lat:this.state.lat,lng:this.state.lng};    
							fetch('/updateLocation',{ method: 'POST', body:JSON.stringify(data),
							headers: {"Content-Type": "application/json" } }).then(response=>{
							return response.json()}).then((body)=>{if(body.length){this.setState({arr:body}); 
							//alert(this.state.status); 
							if(body[0].status==='Pending'){document.getElementById('Cancel').innerHTML='Accept';this.setState({status:'Pending'});
					     		  var cookies=JSON.parse(localStorage.getItem('cookies')); cookies.id1=body[0]._id; 
						    	  localStorage.setItem('cookies',JSON.stringify(cookies));
							}  
							else if(body[0].status==='Ongoing'){this.setState({status:'Ongoing'});document.getElementById('Cancel').innerHTML='Cancel';} 

							}
		          }).catch(err=>console.log(err)); 	  
		 
	}.bind(this),2000);  
	
				    setInterval(function(){	
												//alert(this.state.drivername); 
                        
							if(this.state.status!=='___')
							{						
								var data={id:this.state.id};  
								//alert(this.state.id);								
							fetch('/updateAmbulance',{ method: 'POST',body:JSON.stringify(data),
								headers: {"Content-Type": "application/json" } }).then(response=>{	return response.json()}).then((body)=>{ 
								this.setState({status:body.status});
                                    
								if(this.state.status==='Done'){ alert('The Trip is over');
								   document.getElementById('Cancel').innerHTML='Done';
											var cookies=JSON.parse(localStorage.getItem('cookies'));
										    cookies.id1=null;  
											localStorage.setItem('cookies',JSON.stringify(cookies));   
								   }   }).catch(err=>console.log(err)); 
							}					
						}.bind(this),3000);
			     

}

fun1=(event)=>{
event.preventDefault();

if(document.getElementById('Cancel').innerHTML==='Accept'){
   					var data={id:this.state.id};    

		fetch('/AcceptDriver',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body)=>{ alert('Accepted');
		this.state.status='Ongoing';  document.getElementById('Cancel').innerHTML='Cancel';
		}).catch(err=>console.log(err));    
		
	
}
 else if(document.getElementById('Cancel').innerHTML==='Cancel')
{
	
   					var data={id:this.state.id};     //alert(this.state.id);
fetch('/removeAmbulance',{ method: 'POST',body:JSON.stringify(data),
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
	 var data={name:this.state.drivername}
	 this.state.drivername=null;
	 fetch('/driverSignout',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body)=>{ alert('Cancelled'); 
		this.setState({status:'Done'});    
		document.getElementById('Cancel').innerHTML='Done';
		}).catch(err=>console.log(err));  
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

export default connect(mapStateToProps, mapDispatchToProps)(Ambulance);
//export Showcart;



//export default Home;
