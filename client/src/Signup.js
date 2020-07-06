import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

let username=null;


class Signup extends Component{
	constructor(props){
		super(props); this.fun.bind(this); this.state={path:"http://localhost:5000"}
	}
	
render()
{
 return (
 <div style={{width:"100%"}}>
 <div id = "login-box" >
		<div class = "right-box">

			<center><h5><span class = "signin">Sign Up </span></h5></center>
				
			<input type = "text" name = "name" id='1' placeholder="Username" required/><br></br><br></br>
			<input type = "text" name = "email" id='2' pattern="[a-zA-Z0-9]+@gmail.com" placeholder="Email" required/><br></br><br></br>
			<input type = "password" name = "pass" id='3'  placeholder="password" required/><br></br><br></br>
			<input type = "password" name = "password" id='4'  placeholder="Retypepassword" required/><br></br><br></br>
			<select name='type' id='5' required>
			<option>User</option><option>Doctor</option>
			</select>
			<br></br><br></br>
			<input type='text' placeholder='specialist if Doctor' id='6' name='specialist' /><br></br><br></br>
			<button  name = "signup-button"  class='btn btn-primary' value = "sign up" onClick={this.fun.bind(this)}>Sign Up</button><br></br><br></br>		
		</div>
		<div class = "left-box" style={{display:'block',marginTop:"-100px"}}>
			<center><h5><span class = "signinwith">Sign in with Social Network</span></h5></center><br></br>
			<div style={{display:'inline'}}><a class="fa fa-google" href="http://localhost:8080/auth/google"></a></div>
			<div style={{display:'inline'}}><a class="fa fa-facebook-square" href="http://localhost:8080/auth/facebook"></a></div>
			<div style={{display:'inline'}}><a class="fa fa-linkedin-square" href = "http://localhost:8080/auth/linkedin"></a></div><br></br><br></br><br></br>	<br></br><br></br>	<br></br>	
			<div style={{display:'block'}}><a href='/Signin'><button class='btn btn-warning'>Already have an account</button></a></div><br></br>	
			<div class={{display:'block'}}><a href='/'><button class='btn btn-success'>Back to Home</button></a></div>	
		</div>
	
			
			
	</div>

 </div>
 
)}



fun=(event)=>{
	event.preventDefault();
	if(document.getElementById('3').value!=document.getElementById('4').value){alert("Password Doesn't Match");return false;}
	if(document.getElementById('1').value.length==0 || document.getElementById('2').value.length==0 || document.getElementById('3').value.length==0 
	|| (document.getElementById('5').value==='Doctor' && document.getElementById('6').value.length===0) ){alert('Please Fill The Required Places'); return false;}
	var data={name:document.getElementById('1').value,email:document.getElementById('2').value,pass:document.getElementById('3').value,type:
	document.getElementById('5').value,specialist:document.getElementById('6').value   };
fetch(this.state.path+'/localSignup',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.username){username=body.username; alert(username); localStorage.setItem('user',username); 
localStorage.setItem('type',body.type); 		}
		else alert('Username or Email is already taken!! Please Try Another');
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
//export Showcart;

