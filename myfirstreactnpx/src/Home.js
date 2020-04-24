import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
let username=null,redir=false;


class Home  extends Component{
	constructor(props){
		super(props); this.state={username:null}
	}
		redirect=(event)=>{			  
	if(redir)return <Redirect to='/' />	
	}


 signout=(event)=>{
	 event.preventDefault();
	 alert('Signed Out Successfully');
	 	localStorage.removeItem('user');

	 this.componentDidMount();
	redir=true;  
}

componentDidMount()
{
	
	this.state.username=localStorage.getItem('user');
	alert(this.state.username);
username=this.state.username;
	 if(this.state.username)
	 {
		 document.getElementById('login1').style.display='block';document.getElementById('login').style.display='None';
		 		document.getElementById('profile').style.display='block';  

	 }
	 else 
	 {
		 document.getElementById('login').style.display='block';document.getElementById('login1').style.display='None';
	 }
		 
  
}	
render()
{
return (<div>
<div>{this.redirect.bind(this)}</div>

 <center> <h2 style={{backgroundColor:"pink",color:"white",padding:"20px",marginTop:"0%"}}>Welcome to Hospito<br></br><button class='btn btn-info' >We care about your health </button></h2>
 <div ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBoA6k0Bf8E7A5FUJhfEwq2bGvfy7x-x6qAeT5TlaYba-XljO4" width="1000px" height="300px" />
	  </div></center>

<span id='link' style={{float:"right",marginTop:"-20%"}}>
<button id='login' class='btn btn-primary' id='login1'  onClick={this.signout.bind(this)}>Logout</button>
<a  href='/signin' ><button id='login' class='btn btn-primary btn-sm'>Login</button></a></span>	
		
<div id='profile' style={{display:"None"}}>
 <i class='fa fa-male' style={{float:"left",marginTop:"-15%",marginLeft:"10px",color:"green",fontSize:"60px"}}></i> <a class='btn btn-primary' 
style={{marginTop:"-20%"}}href="/profile" >My Profile</a>   

</div> 

 <br></br>
<div style={{float:"right", marginTop:"0%", }}><button style={{float:"right",marginTop:"-22%",marginRight:"10%"}} class='btn btn-warning'>Ask Hospito</button>
<iframe style={{float:"right", marginTop:"-10%", }}
    allow="microphone;"
    width="260"
    height="500"
    src="https://console.dialogflow.com/api-client/demo/embedded/bec5d9dd-8f79-44bc-9143-76128a4a6df6">
</iframe>
</div>
  <section class="features-icons bg-light text-center">
    <div id='contain' class="container" >
      <div class="row">
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
<i class='fa fa-hospital-o' style={{fontSize:"40px",color:"purple"}}></i>            </div>
            <h3 ><a href="/hospital">Seach Health Centres</a></h3>
            <p class="lead mb-0">Search Nearby Hospitals and Nursey Homes</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
<i class='fa fa-user-md'  style={{fontSize:"40px",color:"green"}}></i>

            </div>
            <h3 ><a href='/showdoctor'> Ask An Appointment</a> </h3>
            <p class="lead mb-0">Ask a doctor for appointment</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class='fa fa-medkit' style={{fontSize:"40px",color:"red"}}></i>

</div>
            <h3 ><a href='/medicine'>Buy Medicines</a></h3>
            <p class="lead mb-0">Buy medicines online</p>
          </div>
        </div>
		
      </div>
	  <div class="row">
<div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
<i class='fa fa-money' style={{fontSize:"40px",color:"green"}}></i>

</div>
            <h3 ><a href='/Donation'>Donate And Save A Life</a></h3>
            <p class="lead mb-0">Donate Online Here</p>
          </div>
        </div>

<div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class='fa fa-file' style={{fontSize:"40px",color:"grey"}}></i>

</div>
            <h3 ><a href='/ShowBlog'>Blogs</a></h3>
            <p class="lead mb-0">Check Out Daily Updates in the world of Health and Fitness</p>
          </div>
        </div>
		
<div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class='fa fa-ambulance' style={{fontSize:"40px",color:"tomato"}}></i>

</div>
            <h3 ><a href='/GetAmbulance'>Book An Ambulance</a></h3>
            <p class="lead mb-0">Emergency!!!Get An Ambulance Right Now At Your DoorStep</p>
          </div>
        </div>
		
		<div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class='fa fa-video' style={{fontSize:"40px",color:"darkblue"}}></i>

</div>
            <h3 ><a href='/video'>Informative Videos</a></h3>
            <p class="lead mb-0">Videos By Eminent Doctors And Physicians</p>
          </div>
        </div>
		
		
		<div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class='fa fa-info' style={{fontSize:"40px",color:"red"}}></i>

</div>
            <h3 ><a href='/Pandemic'>Updates During Pandemic</a></h3>
            <p class="lead mb-0">Authentic Updates During Pandemic</p>
          </div>
        </div>
		
		
		
      </div>

	  
	  </div>
  </section>

  
 <span><br></br><br></br><br></br></span>
    <div class="container-fluid p-0" >
      
        <div class="col-md-6 order-lg-1 my-auto showcase-text">
          <h2 >About Hospito</h2>
          <p class="lead mb-0">Hospito is a private organistaion which provides heatlhcare services through its website.It provides online medicine 
		  purchasing and delivery service,Scheduling Appointments with top doctors,Providing information about hospitals for specific problems.</p>
        </div> <div class="col-md-6 order-lg-2 text-white showcase-img">
		<img src="data:image/jpeg;base64,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" class= "img-fluid rounded-circle mb-3" width="500px" height="250px"/>
		</div>
      </div>

<br></br>

 <section class="call-to-action text-white text-center" >
    <div class="container" style={{float:"right", marginRight:"0%", marginTop:"0%"}}>
	<span><br></br></span>
         <div > <b class="btn btn-primary">Contact Details:</b></div>   	<span><br></br></span>
		<div ><b class="btn btn-danger">Email:</b><b class="btn">hospito9163@gmail.com</b></div>	<span><br></br></span>
	<div>	   <b class="btn btn-success">Phone:</b><b style={{marginRight:"8%"}} class="btn">7003905424</b></div>	<span><br></br></span>
	<div >		<b class="btn btn-warning">Address:</b><b class="btn btn-default">Hiland Park,Kolkata,India</b></div>
	 </div>   

	<span><br></br></span>
  </section>
	<span><br></br></span>

<footer class="footer bg-light">
<div class="container" >
      <div class="row">
	  <b class="btn btn-info">VISIT US AT SOCIAL MEDIA :</b>
       	<span><br></br></span>

        <div class="col-lg-6 h-100 text-center text-lg-right my-auto">
          <ul class="list-inline mb-0">
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fab fa-facebook fa-2x fa-fw"></i>
              </a>
            </li>
           
            <li class="list-inline-item">
              <a href="#">
                <i style={{marginRight:"20%"}} class="fab fa-instagram fa-2x fa-fw"></i>
              </a>
            </li>
            
            <li class="list-inline-item">
              <a href="#">
                <i style={{marginRight:"20%"}} class="fab fa-youtube fa-2x fa-fw"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>


</div>)
}

}


export  {Home};
