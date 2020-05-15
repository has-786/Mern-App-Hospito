import React ,{Component} from 'react';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './App.css';
import {connect} from "react-redux";



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
    
	<div><a href='/Deleteblog'><button class='btn btn-primary' >Delete Blogs</button></a></div>
	<span><br></br><br></br></span>
	<div><a href='/Deletehospital'><button class='btn btn-danger' >Delete Hospitals</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/Deleteproduct'><button class='btn btn-success' >Delete Products</button></a></div>
		<span><br></br><br></br></span>
	<div><a href='/Deletevideo'><button class='btn btn-warning' >Delete Videos</button></a></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Delete);