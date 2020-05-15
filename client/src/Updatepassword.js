import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";

class Updatepassword extends Component
{
    constructor(props){super(props);}
	componentDidMount(){localStorage.removeItem('otp');}
	render(){
	return (
		<div><center><h1 style={{backgroundColor:"black",color:"white"}}>Update Password</h1></center>
		<button class='btn btn-danger'>Enter Email ID</button><input type='text' id='1' name='email' pattern="[0-9a-zA-Z]+@gmail.com" required />
		<button class='btn btn-success'>Enter New Password</button><input type='text' id='2' name='pass'  required />
		<button type='submit' onClick={this.fun.bind(this)}>Submit</button>
					<br></br><br></br><br></br><br></br><br></br>

		<center><a href='/Signin' id='3' style={{'display':'None'}}><button class='btn btn-primary'>Sign in Here</button></a></center>

		</div>	)
	}
	fun=(event)=>{
		event.preventDefault();
		var data={email:document.getElementById('1').value,pass:document.getElementById('2').value};
		fetch('/passwordUpdated',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then((response)=>{
		return response.json()}).then((body)=>{  
					if(body.msg!='error'){alert(body.msg);	document.getElementById('3').style.display='block'; 
   }
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

export default connect(mapStateToProps, mapDispatchToProps)(Updatepassword);