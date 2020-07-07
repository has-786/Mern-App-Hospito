import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";
let username=null;


class Signin extends Component{
	constructor(props){
		super(props); username=null; this.state={path:"http://localhost:5000"}
	}
	
	
	componentDidMount()
	{
			
	if(username)alert("Hi "+username);
	}
	
	fun=(event)=>{
		event.preventDefault();
		//alert(username);
		if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0){alert('Please Fill The Required Places'); return false;}
		
		var data={name:document.getElementById('1').value,pass:document.getElementById('2').value };
		fetch(this.state.path+'/localSignin',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.username){username=body.username; alert("Signed in as "+username); localStorage.setItem('user',username);
																			localStorage.setItem('type',body.type);
		}
		else alert('The username or password is incorrect!! Please Try Again');
		}).catch(err=>console.log(err));
		
	  
		
	}
	
render()
{
 return (
 <div>
 
 <div id = "login-box">
 <div class='left-box' style={{display:'block'}}><br></br><br></br>
 				<div><a href='/Olddriver'><button class='btn btn-primary'>Sign in As Ambulance</button></a></div><br></br><br></br>
				<div><a href='/'><button class='btn btn-success'>Back to Home</button></a></div><br></br>
 
 </div>
		<div class = "right-box">
			<center><h5><span class = "signin">Sign In </span></h5></center>
				
	
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "password" name = "pass" id='2'  placeholder="password" required/>		

		<br></br><br></br>
			<button name = "signup-button" onClick={this.fun.bind(this)} class='btn btn-primary' value = "sign in">Sign In</button><br></br><br></br>
	<a href='/Forgotpassword' ><button class='btn btn-danger btn-sm'>forgot password?</button></a>
<br></br><br></br>

				<a href='/Signup'><button class='btn btn-warning'>Don't have an account</button></a><br></br>

<br></br><br></br>

				 				 
				 
				
		</div>
	</div>
 </div>
 
)}

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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);