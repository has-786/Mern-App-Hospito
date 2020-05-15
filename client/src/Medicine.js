import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

import {
  // existing imports
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
const MapWrapped = withScriptjs(withGoogleMap(Map));

let username=null;

class  Medicine extends Component{
constructor(props){ super(props);  this.state={username:null,arr:[{prodName:null,quantity:null,price:null,disease:null}],obj:{prodName:null,price:null,disease:null},msg:null}; 
 this.fun = this.fun.bind(this);  this.fun1 = this.fun1.bind(this);  
}
componentDidMount()
{ 
	this.state.username=localStorage.getItem('user');
	if(this.state.username)alert("Hi "+this.state.username);
    
	var data={name:this.state.username}; //this.setState({ position: 1 });
	fetch('/showAllProds',{ method: 'POST',body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{//this.setState({arr:body});  
 this.props.showAllProds(body);               
 document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
}	
		
		
render()
{
	
 return (
 <div>
 <center><h2 style={{"width":"100%"}}>BUY MEDICINES</h2></center>  
<div class='row'>
<div class='col-lg-8'>
<form onSubmit={this.fun}><button class='btn btn-sm btn-primary'>Search Medicines </button><input type='text'  name='name'  id='1' required/><input type='submit'  value='Search' /></form></div>
<div class='col-lg-4'> <a href="/Showcart"><button  id='showcart' class='btn btn-success' >Show Cart</button></a>   </div>
</div>					
	<div id='show1'>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.props.prod.arr.map( res=>( 

	    <div class="col-lg-4"  >		<br></br><br></br>

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{padding:"20px",border:"5px solid red",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

				    <div class="features-icons-icon d-flex" >
<div class="col-lg-3">	<center><button class='btn btn-secondary'>ID</button></center></div><div class="col-lg-9" style={{border:"2px solid purple",backgroundColor:"cyan",padding:"5px",borderRadius:"10px"}}><center>{res._id}</center></div>
			</div><br></br><br></br>
				
				
				
            <div class="features-icons-icon d-flex" >
<div class="col-lg-3">	<center><button class='btn btn-secondary'>Name</button></center></div><div class="col-lg-9"><center><button class='btn btn-primary'>{res.prodName}</button></center></div>
			</div><br></br>
			
			
			
			   <div class="features-icons-icon d-flex" >
<div class="col-lg-3">	<button class='btn btn-secondary'>Quantity</button></div><div class="col-lg-9"><center><button class='btn btn-primary'>{res.quantity}</button></center></div>
			</div><br></br>
			
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-3"><button class='btn btn-secondary'>Price</button></div><div class="col-lg-9"><center><button class='btn btn-success'> Rs.{res.price} </button></center></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Disease</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {res.disease} </button></center></div>
			</div><br></br><br></br>
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12">	<button  class='btn btn-warning' id={res.prodName+res.quantity} onClick={this.fun1.bind(this,this.state.username,res.prodName,res.quantity)} style={{marginRight:"15px"}}>Add To Cart</button></div>
		 <br></br><br></br><br></br>
			</div>	
			</div>
		</div><br></br><br></br><br></br>
	
        </div>		

				
		))}
		</div></div></section>
	</div> 
		
	
</div>
  )
}
 fun=(event)=>{
	    event.preventDefault(); 
		var data={"name":document.getElementById('1').value};      alert(JSON.stringify(data));
		fetch('/showProduct',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{ if(!Array.isArray(body)){this.setState({obj:body});document.getElementById('show2').style.opacity=1;} 
           else {// this.setState({arr:body});
		    this.props.searchProds(body);

		   if(!body.length)alert('No result found'); document.getElementById('show1').style.opacity=1;} }).catch(err=>console.log(err));
 
}

fun1=(username,prodName,quantity)=>{
	
if(document.getElementById(prodName+quantity).innerHTML==='Add To Cart'){
	if(!this.state.username){alert('Please Login First');return false;}
	var data={"name":username,"prodName":prodName,"quantity":quantity};      alert(JSON.stringify(data));
		fetch('/addToCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg);   if(body.msg=='Added to cart')document.getElementById(prodName+quantity).innerHTML='Remove From Cart';  }).catch(err=>console.log(err));
}

else 
{
	var data={"name":username,"prodName":prodName,"quantity":quantity};      alert(JSON.stringify(data));
		fetch('/removeFromCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
(body)=>{alert(body.msg);document.getElementById(prodName+quantity).innerHTML='Add To Cart';}).catch(err=>console.log(err));                                                                                                    
}
	

}


}
//export default Medicine;



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

export default connect(mapStateToProps, mapDispatchToProps)(Medicine);
//export Showcart;
