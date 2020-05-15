import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";





class Inserthospital extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >UPLOAD HOSPITAL</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >Name</button><input type='text' id='name' name='name'   required/></div>
	<span><br></br><br></br></span>
	<div><button class='btn btn-danger' >Address</button><input type='text' id='address' name='address'   required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Email</button><input type='text' id='email' name='email'   required/></div>
		<span><br></br><br></br></span>
		<div><button class='btn btn-danger' >Phone</button><input type='text' id='phone' name='phone'   required/></div>
		<span><br></br><br></br></span>
	<div>
		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Upload</button>
	</div>
	<span><br></br><br></br></span>
	
	</center>
</div>);
}



fun2=()=>{
		//if(!this.state.username){alert('Please Login First');return false;}
		
 var data={name:document.getElementById('name').value,address:document.getElementById('address').value,email:document.getElementById('email').value,
 phone:document.getElementById('phone').value};
	fetch('/inserthospital',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(Inserthospital);
