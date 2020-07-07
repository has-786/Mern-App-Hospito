import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;


class Olddriver extends Component{
	constructor(props){
		super(props); this.state={path:"http://localhost:5000",drivername:null};  
	}
	
	fun=(event)=>{
		event.preventDefault();
		//alert(username);
			if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0 ){alert('Please Fill Required Places'); return false;} 
			
		var data={name:document.getElementById('1').value,pass:document.getElementById('2').value };
		fetch(this.state.path+'/driverSignin',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.drivername){this.state.drivername=body.drivername; alert("Signed in as "+this.state.drivername); 
		var cookies={};
		
		if(localStorage.getItem('cookies')){var cookies=JSON.parse(localStorage.getItem('cookies')); }
		cookies.drivername=this.state.drivername;
		
		  localStorage.setItem('cookies',JSON.stringify(cookies)); 		}
		else alert('The username or password is incorrect!! Please Try Again');
		}).catch(err=>console.log(err));
	}
	
render()
{
 return (
 <div>
 <div id = "login-box">
		<div class = "right-box">
			<center><h5><span class = "signin">Sign In </span></h5></center>
				
	
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "password" name = "pass" id='2'  placeholder="password" required/>		

		<br></br><br></br>
			<button name = "signup-button" onClick={this.fun.bind(this)} class='btn btn-primary' value = "sign in">Sign In</button><br></br><br></br>
<br></br><br></br>

				<a href='/Newdriver'><button class='btn btn-warning'>Don't have an account</button></a>
<br></br><br></br>

				<a href='/Ambulance'><button class='btn btn-success'>Go to Ambulance</button></a>	
		</div>
	</div>
 </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Olddriver);
//export Showcart;



//export default Home;
