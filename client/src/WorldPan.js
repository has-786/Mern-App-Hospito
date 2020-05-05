import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';




class  WorldPan extends Component{
constructor(props){ super(props);  this.state={username:null,arr:[{name:null,address:null,email:null,phone:null}],msg:null};
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
	var data={name:null};
	fetch('/getCountry',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body}); document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div >
 <center><h2>PANDEMIC IN WORLD NOW</h2></center>   
 <br></br><br></br> 

	<center><div class="row" style={{width:"60%"}} >
			<div class="col-lg-3"><button class='btn btn-primary'>COUNTRY</button></div> <div class="col-lg-3"><button class='btn btn-danger'>DIED</button></div>
			<div class="col-lg-3"><button class='btn btn-warning'>SUFFERING</button></div> <div class="col-lg-3"><button class='btn btn-success'>CONTINENT</button></div>
	</div>
	</center>
<br></br><br></br>
	<div id='show1'>		
		
			{this.state.arr.map( res=>(<section>
			<center><div class='row' style={{backgroundColor:'pink',border:'5px solid purple',width:"60%",borderRadius:'10px',paddingTop:'10px' ,paddingBottom:'10px' }}>
				<div class="col-lg-3"><button class='btn btn-primary'>{res[0]}</button></div>
			    <div class="col-lg-3"><button class='btn btn-danger'>{res[2]}</button></div>
				<div class="col-lg-3"><button class='btn btn-warning'>{res[1]}</button></div>
				<div class="col-lg-3"><button class='btn btn-success'>{res[3]}</button></div>
				</div>
				</center>
				<br></br><br></br></section>
             ))}
		 </div>
</div>
  )
}

}
export {WorldPan};


