import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';




class  Hospital extends Component{
constructor(props){ super(props);  this.state={username:null,arr:[{name:null,address:null,email:null,phone:null}],msg:null};
this.fun.bind(this); 
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
	
	fetch('http://localhost:8080/showAllHospitals',{ method: 'GET',
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
			
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

		{this.state.arr.map( res=>( <div class="col-lg-4"  >		<br></br><br></br>

					 <div class="row">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{padding:"20px",backgroundColor:"pink",borderRadius:'10px',border:"5px solid green"}} >
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



export {Hospital};


