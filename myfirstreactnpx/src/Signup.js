import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

let username=null;


class Signup extends Component{
	constructor(props){
		super(props); this.fun.bind(this);
	}
	
render()
{
 return (
 <div>
 
 <div id = "login-box">
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
			<input type='text' placeholder='specialist if Doctor' name='specialist' /><br></br><br></br>
			<button  name = "signup-button"  class='btn btn-primary' value = "sign up" onClick={this.fun.bind(this)}>Sign Up</button><br></br><br></br>
				<a href='/signin'><button class='btn btn-warning'>Already have an account</button></a><br></br>	
				<a href='/'><button class='btn btn-success'>Back to Home</button></a>	

		</div>
			<div class = "left-box">
			<center><h5><span class = "signinwith">Sign in with Social Network</span></h5></center><br></br><br></br>
			<div><a class="fa fa-google" href="http://localhost:8080/auth/google"></a></div>
			<div><a class="fa fa-facebook-square" href="http://localhost:8080/auth/facebook"></a></div>
			<div><a class="fa fa-linkedin-square" href = "http://localhost:8080/auth/linkedin"></a></div>
			</div>
			
			
	</div>
 </div>
 
)}

google=(event)=>{
		event.preventDefault();
		fetch('http://localhost:8080/auth/google',{ method:'GET',headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{  
					alert(body.user);  
		}).catch(err=>console.log(err));
		
		
}



fun=(event)=>{
	event.preventDefault();
	if(document.getElementById('3').value!=document.getElementById('4').value){alert("Password Doesn't Match");return false;}
	var data={name:document.getElementById('1').value,email:document.getElementById('2').value,pass:document.getElementById('3').value,type:
	document.getElementById('5').value  };
fetch('http://localhost:8080/localSignup',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.username){username=body.username; alert(username); localStorage.setItem('user',username);  }
		else alert('Username is already taken!! Please Try Another');
		}).catch(err=>console.log(err));
	}
}


class Signin extends Component{
	constructor(props){
		super(props);
	}
	
	
	componentDidMount()
	{
			
	alert(username);
	}
	
	fun=(event)=>{
		event.preventDefault();
		//alert(username);
		var data={name:document.getElementById('1').value,pass:document.getElementById('2').value };
		fetch('http://localhost:8080/localSignin',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{ if(body.username){username=body.username; alert(username); localStorage.setItem('user',username);  }
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
	<a href='/forgotPassword' ><button class='btn btn-danger btn-sm'>forgot password?</button></a>
<br></br><br></br>

				<a href='/signup'><button class='btn btn-warning'>Don't have an account</button></a><br></br>
				<a href='/olddriver'><button class='btn btn-primary'>Sign in As Ambulance</button></a>

<br></br><br></br>

				<a href='/'><button class='btn btn-success'>Back to Home</button></a>
				 				 
				 
				
		</div>
	</div>
 </div>
 
)}

}


export {Signup,Signin};