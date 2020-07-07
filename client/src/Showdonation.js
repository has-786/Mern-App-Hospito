import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

let username=null;

class Showdonation extends Component{
	constructor(props)
	{
		super(props);
		this.state={path:"http://localhost:5000",username:null,arr:[{_id:null,cause:null,amount:null,timestamp:null }]}; 
	}
	
componentDidMount()
{
	
	this.state.username=localStorage.getItem('user');
	
	var data={name:this.state.username};   
		if(!this.state.username){alert('Please Login First');}

	fetch(this.state.path+'/showDonation',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}


render()
{
 return (
 <div>
 <center><h2 >MY DONATIONS<a href='/'><button class='btn-sm btn btn-primary'  style={{float:"right",marginRight:"0%"}}>Home</button></a></h2></center>
<br></br><br></br>
<div id='show3'> 
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 

	    <div class="col-lg-4"  >		<br></br><br></br>

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{border:"5px solid red",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4">	<button class='btn btn-secondary'>Order ID</button></div><div class="col-lg-8"><center><button class='btn btn-primary'>{res._id}</button></center></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-3"><button class='btn btn-secondary'>Amount</button></div><div class="col-lg-9"><center><button class='btn btn-success'> Rs.&nbsp;{res.amount} </button></center></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Cause</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {res.cause} </button></center></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Time</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {res.timestamp} </button></center></div>
			</div><br></br><br></br>
			</div>
		</div><br></br><br></br><br></br>
	
        </div>		

				
		))}
		</div></div></section>
<br></br>   <br></br>       <br></br>   <br></br>      
<br></br>   <br></br></div></div>)
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


export default connect(mapStateToProps, mapDispatchToProps)(Showdonation);
