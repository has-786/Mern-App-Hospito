import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";


class Changepassword extends Component
{
    constructor(props){super(props);}
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Change Password</h1></center>
		<button class='btn btn-primary'>Enter OTP</button><input type='text' name='otp' id='1'  required />
		<button type='submit' onClick={this.fun.bind(this)}>Submit</button>
			<br></br><br></br><br></br><br></br><br></br>
		<center><a href='/Updatepassword' id='2' style={{'display':'None'}}><button class='btn btn-primary'>Change Password Here</button></a></center>
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

export default connect(mapStateToProps, mapDispatchToProps)(Changepassword);