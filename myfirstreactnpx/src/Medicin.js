Medicine
class Showcart extends Component{
	constructor(props){
		super(props);
this.state={arr:[{prodName:null,price:null,disease:null}],obj:{prodName:'',price:'',disease:''},msg:null,position:null}; 
 this.fun = this.fun.bind(this);	}
	
componentDidMount()
{
	fetch('http://localhost:8080/profile',{ method:'GET',headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ username=body.username; alert(username); }  ).catch(err=>alert(JSON.stringify(err)));
		
		
setTimeout(function(){	
	var data={name:username}; //this.setState({ position: 1 });
	fetch('http://localhost:8080/showCart',{ method: 'POST', body:JSON.stringify(data),
		headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then(
 (body)=>{if(!Array.isArray(body.prods)){this.setState({obj:body.prods});document.getElementById('show4').style.opacity=1;	

} 
 else{ this.setState({arr:body.prods});  document.getElementById('show3').style.opacity=1;} }).catch(err=>console.log(err));	
}.bind(this),1000);
}



render()
{
 return (
 <div>
 <center><h2 >MY CART</h2></center>
<a href='/payment'><button  id='showcart' class='btn btn-success' >Checkout</button></a>
	<div id='show3'>
		{this.state.arr.map( res=>( <div><button class='btn btn-info'>Name</button>
		<button class='btn btn-primary'> {res.prodName} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Price</button><button class='btn btn-success'> Rs.{res.price} </button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button class='btn btn-info'>Disease</button><button class='btn btn-danger'> {res.disease} </button>		&nbsp;&nbsp;&nbsp;&nbsp;
			<button  class='btn btn-warning' id={res.prodName} onClick={this.fun.bind(this,username,res.prodName)} >Remove from Cart</button><span><br></br></span>
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
 (body)=>{alert(body.msg); document.getElementById(prodName).innerHTML='Add To Cart'; }).catch(err=>console.log(err));
}
  
}
