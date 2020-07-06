import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;


class Order extends Component{
	constructor(props){
		super(props);
this.state={path:"http://localhost:5000",username:null,arr:[{_id:null,paymentMethod:null,timestamp:null , prods:[{prodName:null,price:null,disease:null}]}],msg:null,position:null}; 
	}
	
componentDidMount()
{
	this.state.username=localStorage.getItem('user');
	alert(this.state.username);  
		
	var data={name:this.state.username}; 
	fetch(this.state.path+'/showOrder',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}



render()
{
 return (
 <div>
 <center><h2 style={{"width":"100%"}}>MY ORDERS</h2></center>
<br></br><br></br>

<div id='show3'>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.reverse().map( res=>( 
	    <div class="col-lg-4"  >		<br></br><br></br>
			<div class="row" >
				<div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{padding:"10px",border:"5px solid green",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

						<div class="features-icons-icon d-flex" >
							<div class="col-lg-3"><center><button class='btn btn-warning'>OrderID</button></center></div>
							<div class="col-lg-9"><center><button class='btn btn-primary'> {res._id} </button></center></div>
						</div>
						<br></br>
						
						<div class="features-icons-icon d-flex">
							<div class="col-lg-3"><button class='btn btn-warning'>Status</button></div>
							<div class="col-lg-9"><center><button class='btn btn-danger'> {res.paymentMethod} </button></center></div>
						</div><br></br>
			
						<div class="features-icons-icon d-flex">
							<div class="col-lg-3"><button class='btn btn-warning'>Time</button></div>
							<div class="col-lg-9"><center><button class='btn btn-danger'> {res.timestamp} </button></center></div>
						</div><br></br><br></br>
			
						<div class="features-icons-icon d-flex">
							<div class="col-lg-12">	<button  class='btn btn-secondary'   style={{marginRight:"15px"}}>Products</button></div>
							<br></br><br></br><br></br>
						</div>
		                 
						
			 			
{res.prods.map( (prod)=>(<div>

<div class="features-icons-icon d-flex">
	<div class="col-lg-3">	<button  class='btn btn-success'   >Name</button></div>
	<div class="col-lg-9">	<button  class='btn btn-primary' >{prod.prodName}</button></div>
	<br></br><br></br>

</div>
<div class="features-icons-icon d-flex">
	<div class="col-lg-3">	<button  class='btn btn-success'   >Quantity</button></div>
	<div class="col-lg-9">	<button  class='btn btn-primary' >{prod.quantity}</button></div>
	<br></br><br></br>
</div>
<div class="features-icons-icon d-flex">
	<div class="col-lg-3">	<button  class='btn btn-success'   >Price</button></div>
	<div class="col-lg-9">	<button  class='btn btn-primary' >Rs. &nbsp;{prod.price}</button></div>
	<br></br><br></br><br></br><br></br>
</div>
</div>
))}
						

					</div>
				</div><br></br><br></br><br></br>
			</div>	
		))}
		</div>
	 </div>
  </section>
</div> 
		

</div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
//export Showcart;



//export default Home;