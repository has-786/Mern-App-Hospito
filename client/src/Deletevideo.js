import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";



class Deletevideo extends Component{
	constructor(props){
		super(props);  this.state={path:"http://localhost:5000",username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE VIDEO</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><button class='btn btn-primary' >ID</button><input type='text' id='id' name='name'   required/></div>
	<span><br></br><br></br></span> 

		<button class='btn btn-danger'  onClick={this.fun2.bind(this)}>Delete</button>
	
	</center>
</div>);
}



fun2=()=>{
		
 var data={id:document.getElementById('id').value};
	fetch(this.state.path+'/deleteVideo',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(Deletevideo);