import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";



class Deletevideo extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
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
	fetch('/deleteVideo',{ method:'POST',body:JSON.stringify(data),headers: {"Content-Type": "application/json" } }).then(response=>{
	return response.json()}).then((body)=>{ if(body.msg)alert(body.msg);  }  ).catch(err=>console.log(JSON.stringify(err)));		
     

}
}



class Delete extends Component{
	constructor(props){
		super(props);  this.state={username:null,amount:0,cause:null,timestamp:null};
	}
	
	componentDidMount(){this.state.username=localStorage.getItem('user'); }

render()
{
 return (
 <div>
  <center><h2 >DELETE</h2></center>

	<center>	<span><br></br><br></br></span>
    
	<div><a href='/DeleteBlog'><button class='btn btn-primary' >Delete Blogs</button></a></div>
	<span><br></br><br></br></span>
	<div><a href='/DeleteHospital'><button class='btn btn-danger' >Delete Hospitals</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/DeleteProduct'><button class='btn btn-success' >Delete Products</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/DeleteVideo'><button class='btn btn-warning' >Delete Videos</button></a></div>
		<span><br></br><br></br></span>	
	</center>
</div>);
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