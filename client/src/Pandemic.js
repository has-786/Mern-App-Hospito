import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';




class Pandemic extends Component{
constructor(props){ super(props);  this.state={username:null,obj:{op1:'Loading...Please Wait..',op2:'Loading...Please Wait..',op3:'Loading...Please Wait..',op4:'Loading...Please Wait..'},msg:null};
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
		var data={name:null};
	//document.getElementById('show1').style.opacity=1;
	fetch('/getPandemic',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({obj:body});  }).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div style={{"width":"100%",backgroundColor:'pink'}}>
 <center><h2 >PANDEMIC UPDATES</h2></center>  
 
 
	<div class="row" >
			<div class="col-lg-6" style={{padding:"50px"}} ><center><a href='/World'><button class='btn btn-primary' >Pandemic In World</button></a></center></div>
			<div class="col-lg-3" style={{padding:"50px"}}><center><a href='/Country'><button class='btn btn-success' >Pandemic In My Country</button></a></center></div>
	</div>
<br></br><br></br>
	

<section class="features-icons bg-light text-center">
    <div id='contain' class="container" >
      <div class="row">
        <div class="col-lg-4" style={{padding:"30px"}}>
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
				<i class='fa fa-heartbeat' style={{fontSize:"40px",color:"purple"}}></i>            
			</div>
            <h3 >Threat of Covid-19 </h3>
            <p class="lead mb-0" style={{fontWeight:"bold"}}>{this.state.obj.op1}</p>
          </div>
        </div>
        <div class="col-lg-4" style={{padding:"30px"}}>
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
				<i class="fa fa-h-square" style={{fontWeight:"bold",fontSize:"40px",color:"green"}}></i>

            </div>
            <h3 >Danger Ebola Virus</h3>
            <p class="lead mb-0" style={{fontWeight:"bold"}}> {this.state.obj.op2}</p>
          </div>
        </div>
        <div class="col-lg-4" style={{padding:"30px"}}>
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
			<i class="fas fa-diagnoses" style={{fontSize:"40px",color:"red"}}></i>

</div>
            <h3 >Most Dangerous Hepatitis</h3>
            <p class="lead mb-0" style={{fontWeight:"bold"}}>{this.state.obj.op3}</p>
          </div>
        </div>
		
      </div>
	 
		
		
      </div>

	  
  </section>



		 
		 
</div>
  )
}

}
export {Pandemic};


