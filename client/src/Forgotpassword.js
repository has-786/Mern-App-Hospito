import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

class Forgotpassword extends Component
{
    constructor(props){super(props);} 
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Forgot Password</h1></center>
		<button class='btn btn-danger'>Enter Email ID</button><input type='text' id='1' name='email' pattern="[0-9a-zA-Z]+@gmail.com" required />
		<button class='btn btn-primary' onClick={this.fun.bind(this)}>Submit</button>
			<br></br><br></br><br></br><br></br><br></br><center>	<a href='/Changepassword' id='2' style={{'display':'None'}}><button class='btn btn-primary'>Enter OTP</button></a></center>
		</div>)
	}
	
	fun=(event)=>{
		event.preventDefault();
		var data={email:document.getElementById('1').value};
		fetch('/passwordForgot',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{  
					if(body.msg!='error'){alert(body.msg); localStorage.setItem('otp',body.otp); document.getElementById('2').style.display='block'; }
					else alert('An Error Occured!!! Try Again');
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

export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);