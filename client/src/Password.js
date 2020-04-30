import React ,{Component} from 'react';
import { Redirect , BrowserRouter as Router , Route} from 'react-router-dom';
import ReactDOM from 'react-dom';


class forgotPassword extends Component
{
    constructor(props){super(props);} 
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Forgot Password</h1></center>
		<button class='btn btn-danger'>Enter Email ID</button class='btn btn-primary'><input type='text' id='1' name='email' pattern="[0-9a-zA-Z]+@gmail.com" required />
		<button type='submit' onClick={this.fun.bind(this)}>Submit</button>
			<br></br>	<a href='/changePassword' id='2' style={{'display':'None'}}><button class='btn btn-primary'>Enter OTP</button></a>
		</div>)
	}
	
	fun=(event)=>{
		event.preventDefault();
		var data={email:document.getElementById('1').value};
		fetch('http://localhost:8080/passwordForgot',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{  
					if(body.msg!='error'){alert(body.msg); localStorage.setItem('otp',body.otp); document.getElementById('2').style.display='block'; }
					else alert('An Error Occured!!! Try Again');
		}).catch(err=>console.log(err));
		
	}
}


class changePassword extends Component
{
    constructor(props){super(props);}
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Change Password</h1></center>
		<button class='btn btn-primary'>Enter OTP</button><input type='text' name='otp' id='1'  required />
		<button type='submit' onClick={this.fun.bind(this)}>Submit</button>
		<a href='/updatePassword' id='2' style={{'display':'None'}}><button class='btn btn-primary'>Change Password Here</button></a>
		</div>)
	}
	
	fun=(event)=>{
		event.preventDefault();
		if(localStorage.getItem('otp')===document.getElementById('1').value){alert('Correct OTP');  
			document.getElementById('2').style.display='block'; 
		} 
		else alert('Incorrect OTP'); 
	}
	
}


class updatePassword extends Component
{
    constructor(props){super(props);}
	componentDidMount(){localStorage.removeItem('otp');}
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Update Password</h1></center>
		<button class='btn btn-danger'>Enter Email ID</button><input type='text' id='1' name='email' pattern="[0-9a-zA-Z]+@gmail.com" required />
		<button class='btn btn-success'>Enter New Password</button><input type='text' id='2' name='pass'  required />
		<button type='submit' onClick={this.fun.bind(this)}>Submit</button>
		<a href='/signin' id='3' style={{'display':'None'}}><button class='btn btn-primary'>Sign in Here</button></a>

		</div>	)
	}
	fun=(event)=>{
		event.preventDefault();
		var data={email:document.getElementById('1').value,pass:document.getElementById('2').value};
		fetch('http://localhost:8080/passwordUpdated',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{  
					if(body.msg!='error'){alert(body.msg);	document.getElementById('3').style.display='block'; 
   }
					else alert('An Error Occured!!! Try Again');
		}).catch(err=>console.log(err));
		
	}
}


export {forgotPassword,changePassword,updatePassword};