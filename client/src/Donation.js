import React ,{Component} from 'react';
import { Redirect,BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
let username=null;



class Donation extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	
	componentDidMount(){

		this.state.username=localStorage.getItem('user');
		
		 if(!this.state.username)alert('Please login first'); 
		}
	
render()
{
 return (
 <div>
  <center><h2 >DONATE NOW</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Amount Rs.</button><input type='text' id='amount' name='amount'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Cause</button><input type='text' id='cause' name='cause'   required/></div>
		<span><br></br><br></br></span>

	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Pay</button>
	</div>
	<span><br></br><br></br></span>
	<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='/ShowDonation'><button class='btn btn-warning' >Show My Donations</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
	fetch('http://localhost:8080/donation',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
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


class ShowDonation extends Component{
	constructor(props)
	{
		super(props);
		this.state={username:null,arr:[{_id:null,cause:null,amount:null,timestamp:null }]}; 
	}
	
componentDidMount()
{
	
	this.state.username=localStorage.getItem('user');
	
	var data={name:this.state.username};   
		if(!this.state.username){alert('Please Login First');}

	fetch('http://localhost:8080/showDonation',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}



render()
{
 return (
 <div>
 <center><h2 >MY DONATIONS</h2></center>
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
export {Donation,ShowDonation};

