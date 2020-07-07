import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;



class Donation extends Component{
	constructor(props){
		super(props);  this.state={path:"http://localhost:5000",username:null,amount:0,cause:null,timestamp:null};
	}
	
	
	componentDidMount(){

		this.state.username=localStorage.getItem('user');
		
		 if(!this.state.username)alert('Please login first'); 
		}
	
render()
{
 return (
 <div>
  <center><h2 >DONATE NOW<a href='/'><button class='btn-sm btn btn-primary'  style={{float:"right",marginRight:"0%"}}>Home</button></a></h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Amount Rs.</button><input type='text' id='amount' name='amount'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Cause</button><input type='text' id='cause' name='cause'   required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Pay</button>
	</div>
	<span><br></br><br></br></span>
	<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='/Showdonation'><button class='btn btn-warning' >Show My Donations</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<a href='/'><button class='btn btn-primary' >Back to Home</button></a></div>

	</center>
</div>);
}



fun2=()=>{
	if(!this.state.username){alert('Please Login First');return false;}
	var tempDate = new Date();
	var username=this.state.username;
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  const currDate = date;
  this.state.amount=document.getElementById('amount').value;
    let options = {
      key: "rzp_test_SQG8JPTfI1KtZ9",
      amount: this.state.amount*100, // 2000 paise = INR 20, amount in paisa
      name: "Hospito",
      description: "",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS50VEonvgI1-sTW6CHykn0U_7xk8N2_ntoTusf5VatlP7d4ukU",
      handler: function(response) {
     var data={paymentId:response.razorpay_payment_id,username:username,amount:document.getElementById('amount').value,cause:document.getElementById('cause').value,timestamp:currDate};
	fetch('http://localhost:5000/donation',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
      },  
      prefill: {
        name: "Hospito",
        email: "hospito9163@gmail.com"
      },
      notes: {
        address: "Hello World"
      },
      theme: {
        color: "#F37254"
      }
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
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

export default connect(mapStateToProps, mapDispatchToProps)(Donation);
//export Showcart;

