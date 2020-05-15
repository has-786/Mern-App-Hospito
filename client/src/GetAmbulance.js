import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

class Getambulance extends Component{
	constructor(props){
		super(props);  this.state={id:null,phone:null,lat:null,lng:null,arr:[{_id:'___',name:'___',phone:'___',car:'___',status:'___'}],status:'___'};
	}
	
	
componentDidMount()
{
	this.state.id=null;
	      setTimeout(function(){	

		  if( !JSON.parse(localStorage.getItem('cookies')) )alert('Please Enter Mobile No.');
		  else this.state.phone=JSON.parse(localStorage.getItem('cookies')).phone;
		  if(!this.state.phone){}

		  else
		  {
			  if(JSON.parse(localStorage.getItem('cookies')))this.state.id=JSON.parse(localStorage.getItem('cookies')).id2;
				if(this.state.id){
			  alert("Phone No: "+this.state.phone);
				var data={user:this.state.phone};    

					fetch('/showAmbulance',{ method: 'POST', body:JSON.stringify(data),
					headers: {"Content-Type": "application/json" } }).then(response=>{
						return response.json()}).then((body)=>{   
		          
					if(body){ this.state.arr[0]=body.ambu; this.state.status=body.status; //alert(body);
							document.getElementById('Cancel').innerHTML='Cancel';
				}			}).catch(err=>console.log(err));    }  
		  }
		}.bind(this),500);	
		
		
	setInterval(function(){	
					   if( !JSON.parse(localStorage.getItem('cookies')) ){}
						else this.state.phone=JSON.parse(localStorage.getItem('cookies')).phone;
					if(!this.state.phone){}	  
					else
					{
						if(navigator.geolocation)
						{
							navigator.geolocation.getCurrentPosition((position)=>{this.setState({lat:position.coords.latitude});   
							this.setState({lng:position.coords.longitude});  });
						}
						else alert( "Geolocation is not supported by this browser.");
				   }

	}.bind(this),5000);				
  

	
	
	
  setInterval(function(){	
  	  if( !JSON.parse(localStorage.getItem('cookies')) ){}

		  else this.state.phone=JSON.parse(localStorage.getItem('cookies')).phone;
		  if(!this.state.phone){}
		  else{
			     
	  if(this.state.status==='Searching')
      {   	
  var data={name:null};
  fetch('/getAmbulance',{ method: 'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
				return response.json()}).then((body)=>{   
				//alert(body.length);
				if(body.length)
				{
						this.setState({arr:body});  this.state.status='Bookable';	
						alert('Found'); 	document.getElementById('book').style.display='inline';

				}
				else {alert("Sorry!! No AMBULANCE available");  }
			}).catch(err=>console.log(err)); 
      }
  
				else if(this.state.status==='Pending' || this.state.status==='Ongoing' || this.state.status==='Done')
				{
													document.getElementById('search').style.display='None';

						if(JSON.parse(localStorage.getItem('cookies')))this.state.id=JSON.parse(localStorage.getItem('cookies')).id2;
									if(this.state.id){		
								var data={id:this.state.id};
									
								//alert(this.state.id);			
								fetch('/updateAmbulance',{ method: 'POST',body:JSON.stringify(data),
											headers: {"Content-Type": "application/json" } }).then(response=>{
											return response.json()}).then((body)=>{ 	this.setState({status:body.status});
																		//	alert(this.state.status);  
					                  if(this.state.status==='Ongoing'){
													document.getelementById('Cancel').innerHTML='Cancel';
													
												}									  
									 else if(this.state.status==='Done'){
															alert('Trip is Over');
								document.getElementById('book').style.display='None';
											document.getElementById('search').style.display='inline';
			
													document.getElementById('Cancel').innerHTML='Done';
																 var cookies=JSON.parse(localStorage.getItem('cookies'));
																 cookies.id2=null;  
																 localStorage.setItem('cookies',JSON.stringify(cookies));
															}
														}).catch(err=>console.log(err)); 
									}					
									
					}		
		  }	  
   }.bind(this),6000);
 

}

search=(event)=>{
event.preventDefault();
if( !JSON.parse(localStorage.getItem('cookies')) ){alert('Please Enter Mobile No.'); return false;}

this.state.status='Searching'; 
}



fun=(event)=>{
event.preventDefault();

	var phone=document.getElementById('1').value;
	if(phone.length!=10){ alert('Enter Valid Phone Number'); return false;}
	alert('Phone No. Added');
	this.state.phone=phone;
	
	 var cookies={};
	   if(localStorage.getItem('cookies'))var cookies=JSON.parse(localStorage.getItem('cookies')); 
	   cookies.phone=phone;
	   localStorage.setItem('cookies',JSON.stringify(cookies)); 
}


fun1=(event)=>{
event.preventDefault();
    
	if(document.getElementById('Cancel').innerHTML==='Cancel')
	{

				var data={id:this.state.id};  //alert(this.state.id);    
		fetch('/removeAmbulance',{ method: 'POST',body:JSON.stringify(data),
				headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body)=>{ alert('Cancelled');	
				this.setState({status:body.status});  this.state.status='Done'; 
				if(this.state.status==='Done')document.getElementById('Cancel').innerHTML='___';  
			}).catch(err=>console.log(err));                                                                               
	}
}

book=(event)=>{
event.preventDefault();
document.getElementById('search').style.display='None';
document.getElementById('book').style.display='None';

		var tempDate = new Date();
		var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
		const currDate = date;
						var data={user:this.state.phone,amb:this.state.arr[0].name,status:'Pending',timestamp:currDate};
						
						fetch('/addAmbulance',{ method: 'POST',body:JSON.stringify(data),
						headers: {"Content-Type": "application/json" } }).then(response=>{  return response.json()}).then((body1)=>{ alert('Booked');
						this.setState({status:'Pending'});    
						var cookies=JSON.parse(localStorage.getItem('cookies')); cookies.id2=body1._id; 
						  this.state.id= cookies.id2;  localStorage.setItem('cookies',JSON.stringify(cookies)); 
						document.getElementById('Cancel').innerHTML='Cancel'; }).catch(err=>console.log(err));	
	
}
	
render()
{
 return (
 <div style={{"width":"100%"}}>
  <center><h2 style={{"width":"100%"}}>BOOK AN AMBULANCE</h2></center><br></br>
  <center><button class='btn btn-primary'>Phone No.</button><input type='text' id='1' /><button class='btn btn-primary' onClick={this.fun.bind(this)}>Save</button></center>
    <br></br>
  <section>
  <div class="row" >
	

	    <div class="col-lg-12"  >		<br></br><br></br>

		<div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{border:"5px solid red",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-3">	<button class='btn btn-secondary'>Ride ID</button></div><div class="col-lg-9"><center><button class='btn btn-primary'>{this.state.id}</button></center></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
<div class="col-lg-3"><button class='btn btn-secondary'>Driver Name</button></div><div class="col-lg-9"><center><button class='btn btn-success'>{this.state.arr[0].name}</button></center></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Contact</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {this.state.arr[0].phone}</button></center></div>
			</div><br></br><br></br>
			  <div class="features-icons-icon d-flex" >
<div class="col-lg-3">	<button class='btn btn-secondary'>Car No.</button></div><div class="col-lg-9"><center><button class='btn btn-primary'>{this.state.arr[0].car}</button></center></div>
			</div><br></br>
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
	 <center>	<div><button class='btn btn-primary' id='search'  onClick={this.search.bind(this)}>Search</button>&nbsp;&nbsp;&nbsp; 
 <button class='btn btn-primary' id='book'  style={{display:'None'}} onClick={this.book.bind(this)}>Book Now</button></div> </center>
 		<br></br><br></br><br></br>

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

export default connect(mapStateToProps, mapDispatchToProps)(Getambulance);
//export Showcart;



//export default Home;