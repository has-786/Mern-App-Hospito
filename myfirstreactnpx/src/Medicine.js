import React ,{Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';import { GoogleMap } from "react-google-maps";
import {
  // existing imports
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
const MapWrapped = withScriptjs(withGoogleMap(Map));

let username=null;

class  Medicine extends Component{
constructor(props){ super(props);  this.state={arr:[{prodName:null,price:null,disease:null}],obj:{prodName:null,price:null,disease:null},msg:null}; 
 this.fun = this.fun.bind(this);  this.fun1 = this.fun1.bind(this);  
}
componentDidMount()
{ 
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ username=body.username;
		if(username)document.getElementById('link').innerHTML=
		"<a href='http://localhost:8080/signout'><button  class='btn btn-primary' id='login'>Logout</button></a>";
		else document.getElementById('link').innerHTML="<a href='http://localhost:3000/signin'><button id='login' class='btn btn-primary btn-sm' >Login</button></a>";   }  ).catch(err=>console.log(JSON.stringify(err)));	


setTimeout(function(){	
	var data={name:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showAllProds',{ method: 'GET',
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body});  document.getElementById('show1').style.opacity=1;}).catch(err=>console.log(err));	
}.bind(this),1000);		
		
		
}	
render()
{
	
 return (
 <div>
 <center><h2 ><span id='link'><a href='http://localhost:3000/signin'><button id='login' class='btn btn-primary btn-sm'>Login</button></a></span>BUY MEDICINES</h2></center>   
<a href="./cart"><button  id='showcart' class='btn btn-success' >Show Cart</button></a>   
   			<form onSubmit={this.fun}>

			<button class='btn btn-primary'>Search for Medicines </button>&nbsp;&nbsp;&nbsp;&nbsp;	
			<input type='text'  name='name'  id='1' required/>
				<input type='submit'  value='Search' />
           </form>	<br></br><br></br><br></br>		
	<div id='show1'>
	<section class="features-icons bg-light text-center"  >
    <div id='contain' class="container"   >
      <div class="row" >
		{this.state.arr.map( res=>( 

	    <div class="col-lg-4"  >		<br></br><br></br>

					 <div class="row" >
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3" style={{border:"5px solid red",borderRadius:"10px",backgroundColor:"pink"}} >
		  		<br></br>

            <div class="features-icons-icon d-flex" >
<div class="col-lg-4">	<button class='btn btn-secondary'>Name</button></div><div class="col-lg-8"><center><button class='btn btn-primary'>{res.prodName}</button></center></div>
			</div><br></br>
			<div class="features-icons-icon d-flex">
						
		<div class="col-lg-3"><button class='btn btn-secondary'>Price</button></div><div class="col-lg-9"><center><button class='btn btn-success'> Rs.{res.price} </button></center></div>
            </div><br></br>
			<div class="features-icons-icon d-flex">
				  <div class="col-lg-3"><button class='btn btn-secondary'>Disease</button></div>
				  <div class="col-lg-9"><center><button class='btn btn-danger'> {res.disease} </button></center></div>
			</div><br></br><br></br>
			<div class="features-icons-icon d-flex">
		 <div class="col-lg-12">	<button  class='btn btn-warning' id={res.prodName} onClick={this.fun1.bind(this,username,res.prodName)} style={{marginRight:"15px"}}>Add To Cart</button></div>
		 <br></br><br></br><br></br>
			</div>	
			</div>
		</div><br></br><br></br><br></br>
	
        </div>		

				
		))}
		</div></div></section>
	</div> 
		
	<div id='show2'>
		<button class='btn btn-info'>Name</button><button class='btn btn-primary'> {this.state.obj.prodName} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Price</button><button class='btn btn-success'> Rs. &nbsp;{this.state.obj.price} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Disease</button><button class='btn btn-danger'> {this.state.obj.disease} </button> 
		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={this.state.obj.prodName} onClick={this.fun1.bind(this,username,this.state.obj.prodName)} >Add To Cart</button>
	</div>
	
</div>
  )
}
 fun=(event)=>{
	    event.preventDefault();
		var data={"name":document.getElementById('1').value};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/showProduct',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{ if(!Array.isArray(body)){this.setState({obj:body});document.getElementById('show2').style.opacity=1;} 
 else	 { this.setState({arr:body});if(!body.length)alert('No result found'); document.getElementById('show1').style.opacity=1;} }).catch(err=>console.log(err));
 
 
}

fun1=(username,prodName)=>{
if(document.getElementById(prodName).innerHTML=='Add To Cart'){		var data={"name":username,"product":prodName};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/addToCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg);   if(body.msg=='Added to cart')document.getElementById(prodName).innerHTML='Remove From Cart';  }).catch(err=>console.log(err));
}
else 
{
	var data={"name":username,"product":prodName};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/removeFromCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
(body)=>{alert(body.msg);document.getElementById(prodName).innerHTML='Add To Cart';}).catch(err=>console.log(err));                                                                                                    
}
	

}


}


class Showcart extends Component{
	constructor(props){
		super(props);
this.state={arr:[{prodName:null,price:null,disease:null}],obj:{prodName:'',price:'',disease:''},msg:null,position:null}; 
 this.fun = this.fun.bind(this);	}
	
componentDidMount()
{
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username;  }  ).catch(err=>console.log(JSON.stringify(err)));
		
		
setTimeout(function(){	
	var data={name:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{if(!Array.isArray(body.prods)){this.setState({obj:body.prods});document.getElementById('show4').style.opacity=1;	

} 
 else{ this.setState({arr:body.prods});  document.getElementById('show1').style.opacity=1;} }).catch(err=>console.log(err));	
}.bind(this),1000);
}



render()
{
 return (
 <div>
 <center><h2 >MY CART</h2></center>
<a href='/payment'><button  id='showcart' class='btn btn-success' >Checkout</button></a>
	<div id='show1'>
		{this.state.arr.map( res=>( <div><button class='btn btn-info'>Name</button>
		<button class='btn btn-primary'> {res.prodName} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Price</button><button class='btn btn-success'> Rs.{res.price} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Disease</button><button class='btn btn-danger'> {res.disease} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={res.prodName} onClick={this.fun.bind(this,username,res.prodName)} >Remove from Cart</button><span><br></br></span><br></br><br></br><br></br>
		</div>))}
	</div> 
		
	<div id='show4'>
		<button class='btn btn-info'>Name</button><button class='btn btn-primary'> {this.state.obj.prodName} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Price</button><button class='btn btn-success'> Rs. &nbsp;{this.state.obj.price} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Disease</button><button class='btn btn-danger'> {this.state.obj.disease} </button> 
		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={this.state.obj.prodName} onClick={this.fun.bind(this,username,this.state.obj.prodName)} >Remove from Cart</button>
	</div>
	
</div>
  )}
  fun=(username,prodName)=>{
	var data={"name":username,"prodName":prodName};      alert(JSON.stringify(data));
		fetch('http://localhost:8080/removeFromCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then((response)=>{ return response.json()}).then(
 (body)=>{alert(body.msg); if(!body.length)document.getElementById(prodName).innerHTML='Add To Cart'; }).catch(err=>console.log(err));
}
  
}


class Payment extends Component{
	constructor(props){
		super(props);  this.state={amount:null};
	}
	componentDidMount(){
		fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username;  }  ).catch(err=>console.log(JSON.stringify(err)));
		
				
  setTimeout(function(){	
	var data={name:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{ var amt=0; body.prods.map((prod)=>amt+=prod.price); this.setState({amount:amt});}).catch(err=>console.log(err));	
}.bind(this),1000);
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
	var data={username:username,amount:this.state.amount,address:document.getElementById('address').value,timestamp:currDate};
	fetch('http://localhost:8080/CompleteCashOrder',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ this.state.amount=0;  }  ).catch(err=>console.log(JSON.stringify(err)));
	
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
this.state={arr:[{_id:null,paymentMethod:null,timestamp:null , prods:[{prodName:null,price:null,disease:null}]}],msg:null,position:null}; 
	}
	
componentDidMount()
{
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username;  }  ).catch(err=>alert(JSON.stringify(err)));
		
		
setTimeout(function(){	
	var data={name:username}; 
	fetch('http://localhost:8080/showOrder',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{this.setState({arr:body}); alert(JSON.toString(this.state.arr)); document.getElementById('show3').style.opacity=1;}).catch(err=>console.log(err));	
}.bind(this),1000);
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

export {Medicine,Order,Payment,Showcart};
