import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

let username=null;


class Payment extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:null};
	}
	componentDidMount(){
	this.state.username=localStorage.getItem('user');
	alert(this.state.username);  
if(!this.state.username){alert('Please Login First');}
else{
	var data={name:this.state.username}; 
	fetch('http://localhost:8080/showCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{ var amt=0; body.prods.map((prod)=>amt+=prod.price); this.setState({amount:amt});}).catch(err=>console.log(err));	
	}
}	
	
	
render()
{
 return (
 <div>
  <center><h2 >ORDER NOW</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Amount</button><button class='btn btn-success' >  Rs. {this.state.amount}</button></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Address</button><input type='text' id='address' name='address'   required/></div>
		<span><br></br><br></br></span>

	<div>
		<button class='btn btn-success' onClick={this.fun1.bind(this)}>Cash On delivery</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Pay Online</button>
	</div>
	<span><br></br><br></br></span>
	<div>&nbsp;&nbsp;&nbsp;&nbsp;<a href='/order'><button class='btn btn-warning' >Show My Order</button></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<a href='/'><button class='btn btn-primary' >Back to Home</button></a></div>

	</center>
</div>);
}

fun1=()=>{
	var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  const currDate = date;
	var data={username:this.state.username,amount:this.state.amount,address:document.getElementById('address').value,timestamp:currDate};
	fetch('http://localhost:8080/CompleteCashOrder',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ this.state.amount=0;  alert(body.msg);}  ).catch(err=>console.log(JSON.stringify(err)));
	
}


fun2=()=>{
	var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  const currDate = date;
    let options = {
      key: "rzp_test_SQG8JPTfI1KtZ9",
      amount: this.state.amount*1000, // 2000 paise = INR 20, amount in paisa
      name: "Hospito",
      description: "",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS50VEonvgI1-sTW6CHykn0U_7xk8N2_ntoTusf5VatlP7d4ukU",
      handler: function(response) {
        alert(response.razorpay_payment_id);
     var data={paymentId:response.razorpay_payment_id,username:username,amount:0,address:document.getElementById('address').value,timestamp:currDate};
	fetch('http://localhost:8080/CompletePaidOrder',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ this.state.amount=0;  }  ).catch(err=>console.log(JSON.stringify(err)));		
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


class Order extends Component{
	constructor(props){
		super(props);
this.state={username:null,arr:[{_id:null,paymentMethod:null,timestamp:null , prods:[{prodName:null,price:null,disease:null}]}],msg:null,position:null}; 
	}
	
componentDidMount()
{
	this.state.username=localStorage.getItem('user');
	alert(this.state.username);  
		
	var data={name:this.state.username}; 
	fetch('http://localhost:8080/showOrder',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body}); alert(JSON.toString(this.state.arr)); document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	

}



render()
{
 return (
 <div>
 <center><h2 >MY ORDERS</h2></center>
<br></br><br></br>
	<div id='show3'>
		{this.state.arr.map( (res)=>(
 <div><button class='btn btn-warning'>OrderID</button><button class='btn btn-primary'> {res._id} </button>&nbsp;&nbsp;&nbsp;&nbsp;
<button class='btn btn-warning'>Status</button><button class='btn btn-danger'> {res.paymentMethod} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-warning'>Time</button><button class='btn btn-danger'> {res.timestamp} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
<br></br>   <br></br>               
  
  
  
{res.prods.map( (prod)=>(
 <div><button class='btn btn-info'>Name</button><button class='btn btn-primary'> {prod.prodName} </button>&nbsp;&nbsp;&nbsp;&nbsp;
<button class='btn btn-info'>Price</button><button class='btn btn-danger'> {prod.price} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Disease</button><button class='btn btn-danger'> {prod.disease} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
<br></br>   <br></br>       


	</div>))}
<br></br>   <br></br>       <br></br>   <br></br>      
<br></br>   <br></br>       
       

	</div>))}
	</div> 
	
	
</div>
  )
}

  
}



export {Order,Payment};