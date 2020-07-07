import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";



class  Hospital extends Component{
constructor(props){ super(props);  this.state={path:"http://localhost:5000",username:null,arr:[{name:null,address:null,email:null,phone:null}],msg:null};
this.fun.bind(this); 
}
componentDidMount()
{ 
		this.state.username=localStorage.getItem('user');
	var data={name:null};
fetch(this.state.path+'/showAllHospitals',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
			
}	
render()
{
	
 return (
 <div style={{width:"100%"}}>
 <center><h2 style={{width:"100%"}}>FIND HOSPITALS<a href='/'><button class='btn-sm btn btn-primary'  style={{float:"right",marginRight:"0%"}}>Home</button></a></h2></center>   
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
		fetch(this.state.path+'/showHospital',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{  this.setState({arr:body}); if(!body.length)alert('No result found'); document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));
 
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

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
//export Showcart;



