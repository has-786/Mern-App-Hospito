import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';




class  CountryPan extends Component{
constructor(props){ super(props);  this.state={username:null,arr:[{name:null,address:null,email:null,phone:null}],msg:null};
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
	
	fetch('http://localhost:8080/getState',{ method: 'GET',
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div style={{backgroundColor:'darkblue'}}>
 <center><h2 >PANDEMIC IN INDIA NOW</h2></center>  
<br></br><br></br> 
	<div class="row" >
			<div class="col-lg-3"><button class='btn btn-primary'>STATE</button></div> 
			<div class="col-lg-3"><button class='btn btn-warning'>SUSPECTED</button></div>
			<div  class="col-lg-3"><button class='btn btn-danger'>DIED</button></div>
			 <div class="col-lg-3"><button class='btn btn-success'>CONFIRMED</button></div>
	</div>
<br></br><br></br>
	<div id='show1'>		
		
			{this.state.arr.map( res=>(<section>
			<div class='row' style={{backgroundColor:'white',border:'5px solid pink',borderRadius:'10px',paddingTop:'10px' ,paddingBottom:'10px' }}>
				<div class="col-lg-3"><button class='btn btn-primary'>{res[0]}</button></div>
			    <div class="col-lg-3"><button class='btn btn-warning'>{res[2]}</button></div>
				<div class="col-lg-3"><button class='btn btn-danger'>{res[3]}</button></div>
				<div class="col-lg-3"><button class='btn btn-success'>{res[1]}</button></div>
			
				</div>
				<br></br><br></br></section>
             ))}
		 </div>
</div>
  )
}

}
export {CountryPan};


