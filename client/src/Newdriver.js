import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;

class Newdriver extends Component{
	constructor(props){
		super(props); this.fun.bind(this); this.state={drivername:null};
	}
	
render()
{
 return (
 <div>
 <div id = "login-box">
 		<div class = "left-box" style={{display:'block'}}>
		 <br></br><br></br><br></br><br></br>

		<a href='/Olddriver'><button class='btn btn-warning'>Already have an account</button></a><br></br><br></br>		
				<a href='/Ambulance'><button class='btn btn-success'>Go to Ambulance</button></a>	
		</div>
		<div class = "right-box">
			<center><h5><span class = "signin">Sign Up</span></h5></center>
				
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "text" name = "phone" id='2'  placeholder="phone" required/><br></br><br></br>
			<input type = "text" name = "car" id='5'  placeholder="car no." required/><br></br><br></br>
			<input type = "password" name = "pass" id='3'  placeholder="password" required/><br></br><br></br>
			<input type = "password" name = "password" id='4'  placeholder="Retypepassword" required/><br></br><br></br>
			<br></br>
			<button  name = "signup-button"  class='btn btn-primary' value = "sign up" onClick={this.fun.bind(this)}>Sign Up</button><br></br><br></br>
				

		</div>
	</div>
 </div>
 
)}

fun=(event)=>{
	event.preventDefault();
	if(document.getElementById('3').value!=document.getElementById('4').value){alert("Password Doesn't Match");return false;}
	if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0 || document.getElementById('3').value.length==0 
	|| document.getElementById('5').value.length==0){alert('Please Fill The Required Places'); return false;}
	var data={name:document.getElementById('1').value,phone:document.getElementById('2').value,pass:document.getElementById('3').value,car:
	document.getElementById('5').value  };
fetch('/driverSignup',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.drivername){this.state.drivername=body.drivername; alert(this.state.drivername); 
		
		var cookies={};
		cookies.drivername=this.state.drivername;
		
		  localStorage.setItem('cookies',JSON.stringify(cookies)); 
		}
		else alert('Username is already taken!! Please Try Another');
		}).catch(err=>console.log(err));
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

export default connect(mapStateToProps, mapDispatchToProps)(Newdriver);
//export Showcart;



//export default Home;
