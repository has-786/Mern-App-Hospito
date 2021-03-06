import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";




class Insertproduct extends Component{
	constructor(props){
		super(props);  this.state={path:"http://localhost:5000",username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD PRODUCT</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'  required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Quantity</button><input type='text' id='quantity' name='quantity'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger'>Price</button><input type='text' id='price' name='price'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Disease</button><input type='text' id='disease' name='disease'  required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
	
 var data={name:document.getElementById('name').value,quantity:document.getElementById('quantity').value,price:document.getElementById('price').value,
 disease:document.getElementById('disease').value};
	fetch(this.state.path+'/insertproduct',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
  }

}





class InsertVideo extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD VIDEO</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'  required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Tags</button><input type='text' id='tags' name='tags'  required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger'>Link</button><input type='text' id='link1' name='link'  required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
// https://youtu.be/FJLdGDoP300
var t="https://www.youtube.com/embed/"
var link1=document.getElementById('link1').value;
t+=link1.substr(17,link1.length-17);
	
	
 var data={name:document.getElementById('name').value,tags:document.getElementById('tags').value,link1:t};
	fetch('http://localhost:8080/insertVideo',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     
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

export default connect(mapStateToProps, mapDispatchToProps)(Insertproduct);
//export Showcart;



//export default Home;